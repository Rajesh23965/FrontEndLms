import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'; // Hook to access Redux state
import { useNavigate, Outlet } from 'react-router-dom'; // Hooks from React Router for navigation and nested routing
import Sidebar from '../Admin/AdminDashboard/Sidebar/Sidebar';
import Navbar from '../Admin/AdminDashboard/Navbar/Navbar';

const StudentLayout=()=> {
    // Access the current user information from the Redux store
    const user = useSelector((state) => state.Auth.user);

    const navigate = useNavigate(); // Hook for programmatic navigation

    useEffect(() => {
        // If there is no logged-in user, redirect to the login page
        if (!user) {
            navigate("/");
        }
    });

    return (
        <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col w-full ml-56">
          <Navbar />
          <div className="p-4">
            <Outlet />
          </div>
        </div>
      </div>
    ) }
export default StudentLayout;