import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import { User } from '../models/user.js';
dotenv.config();




// --------------------------- Signup controller for user registartion -----------------
export const signup = async (req, res) => {

  try {
    //Destructuring fields from reuest body
    const {
      firstName,
      lastName,
      email,
      accountType,
      password,
      confirmPassword,
      qualification,
      contact,
      otp
    } = req.body;
  
    console.log(req.body);

    const actulOtp = parseInt(otp, 10);
    //Validate all feilds are here or not
    if (!firstName || !lastName || !email || !password || !confirmPassword || !otp || !accountType || !contact) {
      return res.status(400).json({
        success: false,
        message: 'All fiiled are required! '
      })
    }
    if (accountType === 'Instructor' && !qualification) {
      return res.status(400).json({
        success: false,
        message: 'All fiiled are required! '
      })
    }

    //Check password and confirmPassword are same password match karo
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Password confirmation has failed!'
      })
    }

    //Check if user alredy register/signup
    let checkUserPresent = await User.findOne({ email: email });
    if (checkUserPresent) {
      return res.status(400).json({
        success: false,
        message: 'User already registered'
      })
    }

    //Find most recent OTP stored for the user 
    const recentOTP = await OTP.findOne({ email: email }).sort({ createdAt: -1 }).limit(1);
    //validate otp
    console.log(recentOTP)
    if (!recentOTP) {
      return res.status(400).json({
        success: false,
        message: 'OTP expired, Please try again!'
      })

    }

    if (actulOtp !== recentOTP.otp) {
      return res.status(400).json({
        success: false,
        message: 'OTP is inavalid'
      })
    }

    //Hash password for security purspose and store it in userDB
    let hashedPassword = '';
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      console.log('Password hashing error : ', error.message);
      return res.status(400).json({
        success: false,
        message: 'Password hasing error!'
      })
    }

    //Create profile schema to store DB
    let profile = new Profile({
      gender: null,
      dateOfBirth: null,
      about: null,
      contact: contact
    })

    let newProfile = await profile.save();

    //create User schema payload 
    let userPayload = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      additionalDetails: newProfile._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,

    };

    //addtional info of instructor
    if (accountType === 'Instructor') {
      //Upload file on cloud
      const uploaderFile = req.files['qualificationProof[]'];
      const uploadedFile = await uploadImageToCloudinary(uploaderFile, process.env.FOLDER_NAME);
      //add info into payload
      userPayload.qualification = qualification;
      userPayload.qualificationProof = uploadedFile.secure_url;
    }

    let currUser = await User.create(userPayload)

    //Generate JWT token for user authentication
    const payload = {
      email: currUser.email,
      id: currUser._id,
      accountType: currUser.accountType
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '2h'
    })

    currUser.token = token;
    currUser.password = undefined,
    currUser._id = undefined;

    //create cookie and send in response to frontend side
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true
    }

    return res.cookie('token', token, options).status(200).json({
      success: true,
      token,
      currUser,
      message: 'Welcome, User signup succesful!'
    })

  } catch (error) {
    console.log('SignUp error : ', error);
    return res.status(500).json({
      success: false,
      message: 'user cannot be signup ,try again!'
    })
  }
}


// --------------------------  SignIn controllers for user login ----------------------
export const login = async (req, res) => {
  try {
    //fetch details
    let { email, password } = req.body;
    //check validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required!'
      })
    }
    //check user exist
    let currUser = await User.findOne({ email: email }).populate('additionalDetails');
    if (!currUser) {
      return res.status(400).json({
        success: false,
        message: 'User is not registered! please signup first !'
      })
    }
    //match password 
    let hashedPassword = currUser.password;
    try {
      let match = await bcrypt.compare(password, hashedPassword);
      if (!match) {
        return res.status(400).json({
          success: false,
          message: 'Incorrect password!'
        })
      }
    } catch (error) {
      console.log("password comparision error :", error.message);
      return res.status(400).json({
        success: false,
        message: 'Hashed password comparision failed!'
      })
    }
    //generate JWT token
    const payload = {
      email: currUser.email,
      id: currUser._id,
      accountType: currUser.accountType
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '2h'
    })

    currUser.token = token;
    currUser.password = undefined,
      currUser._id = undefined;

    //create cookie and send response
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true
    }
    return res.cookie('token', token, options).status(200).json({
      success: true,
      token,
      currUser,
      message: 'User logged successfully!'
    })



  } catch (error) {
    console.log('Integrnal server error in login:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error!Try again'
    })
  }
}

