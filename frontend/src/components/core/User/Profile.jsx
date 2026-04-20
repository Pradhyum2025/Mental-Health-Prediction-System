import React, { useState, useEffect } from "react";
import { FiEdit2, FiUpload, FiFilter, FiSearch, FiMoon, FiSun } from "react-icons/fi";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import History from "./History";

const UserProfile = () => {
  const loggedInUser = useSelector(store => store.auth);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    profileImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d"
  });


  return (
    <div className={`min-h-screen`}>

        <div className="bg-white dark:bg-gray-800 rounded-lg  p-6 mb-8">

        {/* Profile Section */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
                <img
                  src={loggedInUser?.image}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"

                />
            </div>

            <div className="flex-1">
              <div className="flex flex-col items-center justify-center items-start w-full">
                <h2 className="text-2xl font-bold text-center sm:text-left">{`${loggedInUser?.firstName} ${loggedInUser?.lastName}`}</h2>
                <p className="text-gray-600  w-full text-center sm:text-left">{loggedInUser?.email}</p>
              </div>
            </div>
          </div>

          {/* Prediction History Section */}
         <History/>
         
        </div>

      </div>
      );
};

      export default UserProfile;