import React, { useState } from "react";
import ProfileImage from "../../assets/image.jpeg";
import { ImCross } from "react-icons/im";

const Profile = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white lg:w-6/12 md:w-8/12 w-10/12 shadow-2xl rounded-xl relative p-8 flex flex-col items-center space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
        >
          <ImCross />
        </button>
        <div className="flex flex-col items-center">
          <img
            src={ProfileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <h1 className="text-lg font-semibold">Change your profile image</h1>
        </div>
        <div className="w-full flex flex-col space-y-4">
          <div className="flex justify-between">
            <p className="font-medium">Name:</p>
            <p className="text-gray-600">Rajesh</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">Email:</p>
            <p className="text-gray-600">rajesh@gmail.com</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">Mobile No.:</p>
            <p className="text-gray-600">9800824090</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">Role:</p>
            <p className="text-gray-600">Admin</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">Semester:</p>
            <p className="text-gray-600">8th semester</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
