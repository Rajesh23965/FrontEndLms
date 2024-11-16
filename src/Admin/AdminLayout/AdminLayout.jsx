import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'; 
import { Outlet, useNavigate } from 'react-router-dom'; 
import Sidebar from '../AdminDashboard/Sidebar/Sidebar';
import Navbar from '../AdminDashboard/Navbar/Navbar';

const AdminLayout = () => {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/"); // Redirect to login/home if not admin
        }
    }, [user, navigate]); // Added 'navigate' to dependency array

    if (!user) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="flex h-40 overflow">
        <Sidebar />
        <div className="flex flex-col w-full ml-56">
          <Navbar />
          <div className="p-4">
            <Outlet />
          </div>
        </div>
      </div>
    ) }

export default AdminLayout;
