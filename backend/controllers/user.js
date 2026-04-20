import { User } from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();


//signup --------------------- >>>>>>>>>>>>
export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    let currUser = await User.findOne({ email });

    //check user exist
    if (currUser) {
      return res.status(405).json({
        success: false,
        message: 'User Already Exist! Please Login'
      })
    }

    //Secure password
    let hashPassword = '';
    try {
      hashPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      res.status(503).json({
        success: false,
        message: 'Failed to hash password'
      })
    }

    //create newUser 
    let userPayload = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    })

    //save newUser
    currUser = await userPayload.save();

    //login newUser via send JWT token
    const payload = {
      id: currUser._id,
    }

    let token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '6h'
    });

    currUser = currUser.toObject();
    currUser.token = token;
    currUser.password = undefined;

    let options = {
      expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true
    }

    res.cookie('token', token, options).json({
      success: true,
      message: 'Signup seccussfully!',
      loggedInUser:currUser
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: 'Internal server error!'
    })
  }
}

// login --------------------------->>
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    let currUser = await User.findOne({ email });

    //check user exist
    if (!currUser) {
      return res.status(404).json({
        success: false,
        message: 'User Not Exist! Please Signup'
      })
    }

    // match password
    const hashPassword = currUser.password;

    try {
      let match = await bcrypt.compare(password, hashPassword);
      if (match) {

        //sign JWT token
        const payload = {
          id: currUser._id,
        }
        let token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: '6h'
        })

        currUser = currUser.toObject();
        currUser.token = token;
        currUser.password = undefined;

        let options = {
          expire: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true
        }

        return res.cookie('token', token, options).json({
          success: true,
          message: 'login seccussfully!',
          loggedInUser:currUser
        })
      } else {
        return res.status(203).json({
          success: false,
          message: 'Incorrect Password!'
        })
      }

    } catch (err) {
      console.log(err.message)
      res.status(503).json({
        success: false,
        message: 'Failed to compare password!'
      })
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error!'
    })
  }
}




