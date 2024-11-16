import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { toast } from "react-hot-toast";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { ImUser } from "react-icons/im";
import { TfiEmail } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../../redux/reducers/authReducers";
import { post } from "../../services/APIEndPoint";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const request = await post("/api/users/login", { email, password });
      const response = request.data;
  
      if (request.status === 200) {
        // Show success toast
        toast.success(response.message, {
          position: "top-right",
          className: "relative bg-green-500 text-white font-semibold text-sm p-4 rounded-md shadow-lg",
          icon: "✅",
        });
  
        // Save token in localStorage
        localStorage.setItem('token', response.token);
        console.log('Token saved in localStorage:', response.token);
  
        // Set user in Redux store
        dispatch(SetUser(response.user));
  
        // Navigate based on user role
        if (response.user.role === "admin") {
          navigate("/admin/dashboard");
        } else if (response.user.role === "student") {
          navigate("/student/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please check your credentials.", {
        position: "top-right",
        className: "relative bg-red-500 text-white font-semibold text-sm p-4 rounded-md shadow-lg",
        icon: "❌",
      });
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-100 z-50">
      <div className="bg-white lg:w-6/12 md:w-7/12 w-8/12 shadow-3xl rounded-xl relative p-8">
        <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-900" onClick={onClose}>
          <ImCross />
        </button>
        <div className="bg-gray-200 shadow absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
          <TfiEmail size={30} />
        </div>
        <form className="p-12 md:p-24" onSubmit={handleSubmit}>
          <div className="flex items-center text-lg mb-6 md:mb-8">
            <div className="absolute ml-3"><ImUser size={24} /></div>
            <input
              type="email"
              className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center relative text-lg mb-6 md:mb-8">
            <div className="absolute left-3"><FaLock size={22} /></div>
            <input
              type={showPassword ? "text" : "password"}
              className="bg-gray-200 rounded pl-12 pr-12 py-2 md:py-4 focus:outline-none w-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
            </div>
          </div>
          <button className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
