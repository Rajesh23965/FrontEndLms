import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import {FaEye, FaEyeSlash } from "react-icons/fa";


const ChangePassword = ({ onClose }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isModalOpen,setIsModalopen]=useState(false);
  const handleModalOpen=()=>{
    setIsModalopen(true);
  }
  const handleModalClose=()=>{
    setIsModalopen(false);
  };
 
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white lg:w-6/12 md:w-8/12 w-10/12 shadow-2xl rounded-xl relative p-8 flex flex-col items-center space-y-6">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <ImCross />
        </button>

        <div className="">
          <h1 className="text-4xl font-bold uppercase">Change Password</h1>
        </div>

        <form className="w-full">
          <div className="">
            <label htmlFor="" className="text-xl font-bold">Current Password</label>
            <div className="flex items-center relative text-lg mb-6 md:mb-8">
              <input
                type={showCurrentPassword ? "text" : "password"}
                className="bg-gray-200 rounded pl-12 pr-12 py-2 md:py-4 focus:outline-none w-full"
                placeholder="Current Password..."
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
              </div>
            </div>
          </div>
          <div className="">
            <label htmlFor="" className="text-xl font-bold">New Password</label>
            <div className="flex items-center relative text-lg mb-6 md:mb-8">
              <input
                type={showNewPassword ? "text" : "password"}
                className="bg-gray-200 rounded pl-12 pr-12 py-2 md:py-4 focus:outline-none w-full"
                placeholder="New Password..."
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
              </div>
            </div>
          </div>
          <div className="">
            <label htmlFor="" className="text-xl font-bold">Confirm Password</label>
            <div className="flex items-center relative text-lg mb-6 md:mb-8">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="bg-gray-200 rounded pl-12 pr-12 py-2 md:py-4 focus:outline-none w-full"
                placeholder="Confirm Password..."
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
              </div>
            </div>
          </div>
          <button className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
