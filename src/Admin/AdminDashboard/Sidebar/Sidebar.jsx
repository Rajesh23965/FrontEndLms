import React from "react";
import UserImage from "../../../assets/image.jpeg";
import { MdDashboard } from "react-icons/md";
import { SiBookstack } from "react-icons/si";
import { PiStudentBold } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { TiGroupOutline } from "react-icons/ti";
import { FcDepartment } from "react-icons/fc";
import { IoBookSharp } from "react-icons/io5";
import { TbCategory } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { FaMessage, FaLock } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../../../services/APIEndPoint";
import { Logout } from "../../../redux/reducers/authReducers";
import toast from "react-hot-toast";
const Sidebar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const request = await post("/api/users/logout");

      if (request.status === 200) {
        toast.success("Logout successfully", {
          position: "top-right",
          className:
            "relative bg-green-500 text-white font-semibold text-sm p-4 rounded-md shadow-lg",
          bodyClassName: "pb-2",
          icon: "✅",
          // Movable border-b effect
          style: {
            position: "relative",
          },
          progressClassName: "bg-green-500 h-1 rounded-b-lg animate-progress",
        });
        dispatch(Logout());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please check your credentials.", {
        position: "top-right",
        className:
          "relative bg-red-500 text-white font-semibold text-sm p-4 rounded-md shadow-lg",
        bodyClassName: "pb-2",
        icon: "❌",
        // Movable border-b effect for error
        progressClassName: "bg-red-500 h-1 rounded-b-lg animate-progress",
      });
    }
  };
  return (
    <>
      {/* Sidebar of Admin Page */}
      <div className="fixed top-0 left-0 w-56  bg-[#0e1730] p-6">
        <div className="flex flex-col items-center mt-5">
          <Link to="/admin/dashboard/user-profile">
            <img
              src={UserImage}
              alt=""
              className="w-20 h-20 object-cover rounded-full"
            />
          </Link>
          <p className="text-white mt-2">{user.name}</p>
          <span className="font-bold text-[#30c2a1]">({user.role})</span>
        </div>

        <div className="mt-6 space-y-6 ">
          <div>
            {/* <h2 className="uppercase text-[#30c2a1]">Core</h2> */}
            <ul className="space-y-2 mt-2">
              <li className=" text-[#30c2a1]">
                <Link to="/admin/dashboard/">
                  <div className="flex items-center gap-2">
                    <MdDashboard />
                    <span>Dashboard</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="uppercase text-[#30c2a1]">Transaction</h2>
            <ul className="space-y-2 mt-2">
              <li className=" text-white">
                <Link to="/admin/dashboard/borrowed-book">
                  <div className="flex items-center gap-2">
                    <SiBookstack />
                    <span>Borrowed Books</span>
                  </div>
                </Link>
              </li>
              <li className=" text-white">
                <Link to="/admin/dashboard/issued-book">
                  <div className="flex items-center gap-2">
                    <SiBookstack />
                    <span>Issued Books</span>
                  </div>
                </Link>
              </li>

              <li className=" text-white">
                <Link to="/admin/dashboard/return-book">
                  <div className="flex items-center gap-2 ">
                    <SiBookstack />
                    <span>Return Books</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="uppercase text-[#30c2a1]">User</h2>
            <ul className="space-y-2 mt-2">
              <li className=" text-white">
                <Link to="/admin/dashboard/student-record">
                  <div className="flex items-center gap-2">
                    <PiStudentBold />
                    <span>Student</span>
                  </div>
                </Link>
              </li>
              <li className="flex items-center gap-2 text-white">
                <GiTeacher />
                <span>Teacher</span>
              </li>
              <li className=" text-white">
                <Link to="/admin/dashboard/batch-record">
                  <div className="flex items-center gap-2">
                    <TiGroupOutline />
                    <span>Batches</span>
                  </div>
                </Link>
              </li>
              <li className="text-white">
                <Link to="/admin/dashboard/department-record">
                  <div className="flex items-center gap-2 ">
                    <FcDepartment />
                    <span>Departments</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="uppercase text-[#30c2a1]">Manage Books</h2>
            <ul className="space-y-2 mt-2">
              <li className=" text-white">
                <Link to="/admin/dashboard/add-new-book">
                  <div className="flex items-center gap-2">
                    <IoBookSharp />
                    <span>Books</span>
                  </div>
                </Link>
              </li>
              <li className=" text-white">
                <Link to="/admin/dashboard/category-record">
                  <div className="flex items-center gap-2">
                    <TbCategory />
                    <span>Categories</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="uppercase text-[#30c2a1]">Settings</h2>
            <ul className="space-y-2 mt-2">
              <li className=" text-white">
                <Link to="/admin/dashboard/user-profile">
                  <div className="flex items-center gap-2">
                    <CgProfile />
                    <span>Profile</span>
                  </div>
                </Link>
              </li>
              <li className="flex items-center gap-2 text-white">
                <FaMessage />
                <span>Message</span>
              </li>
              <li className="text-white">
                <Link to="/admin/dashboard/change-password">
                  <div className="flex items-center gap-2 ">
                    <FaLock />
                    <span>Change Password</span>
                  </div>
                </Link>
              </li>
              <li
                className="flex items-center gap-2 text-white"
                onClick={handleLogout}
              >
                <CiLogout />
                <button
                  // className="m-1 rounded py-2 text-black text-lg bg-red-200 hover:bg-red-600 border-t-2 transition duration-200"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
