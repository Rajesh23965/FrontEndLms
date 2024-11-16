import React from "react";
import { ImCross } from "react-icons/im";
import { TfiEmail } from "react-icons/tfi";

const ForgotPassword = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-100 z-50">
      <div className="bg-white lg:w-1/2 md:w-4/12 w-8/12 shadow-3xl rounded-xl relative p-8">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <ImCross />
        </button>

        {/* Modal content */}
        <div className="bg-gray-200 shadow absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
          <div className="text-white">
            <TfiEmail size={30} />
          </div>
        </div>
        <form className="p-12 md:p-24">
          <input
            type="email"
            id="email"
            className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
            placeholder="Enter your email"
          />
          <button className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded mt-4">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
