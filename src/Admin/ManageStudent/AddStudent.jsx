import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser, updateUser, logoutUser } from "../../redux/actions/authAction";
import toast from "react-hot-toast";
import { fetchBatches } from "../../redux/actions/batchActions";
import { fetchDepartment } from "../../redux/actions/departmentAction";

const AddStudent = () => {
  const location = useLocation();
  const userToEdit = location.state?.user;

  // Form state initialization
  const [formData, setFormData] = useState({
    userId: userToEdit ? userToEdit.userId : "",
    name: userToEdit ? userToEdit.name : "",
    email: userToEdit ? userToEdit.email : "",
    mobileNumber: userToEdit ? userToEdit.mobileNumber : "",
    role: userToEdit ? userToEdit.role : "",
    batch: userToEdit ? userToEdit.batch : "",
    department: userToEdit ? userToEdit.department : "",
    password:userToEdit?userToEdit.password:"",
  });

  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state selectors
  const { batches = [], loading: batchLoading } = useSelector((state) => state.batch);
  const { departments = [], loading: departmentLoading } = useSelector((state) => state.department);

  // Effect to fetch batches and departments if not already available
  useEffect(() => {
    if (!batches.length && !batchLoading) {
      dispatch(fetchBatches());
    }
  }, [dispatch, batches.length, batchLoading]);

  useEffect(() => {
    if (!departments.length && !departmentLoading) {
      dispatch(fetchDepartment());
    }
  }, [dispatch, departments.length, departmentLoading]);

  // Handler for form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const { userId, name, email, mobileNumber, batch, department } = formData;
  
    // Validate required fields
    if (!userId || !name || !email || !batch || !department) {
      setError("All fields are required");
      return;
    }
  
    // Ensure email format is valid (basic validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }
  
    const userData = { ...formData };
  
    const action = userToEdit
      ? updateUser({ id: userToEdit._id, userData })
      : createUser(userData);
  
    dispatch(action)
      .unwrap()
      .then(() => {
        toast.success(`${userToEdit ? "User updated" : "User added"} successfully`, {
          position: "top-right",
        });
        navigate("/admin/dashboard/student-record");
        // Reset form fields after successful submission
        setFormData({
          userId: "",
          name: "",
          email: "",
          mobileNumber: "",
          role: "",
          batch: "",
          department: "",
        });
        setError(null);
      })
      .catch((error) => {
        if (error.message === "Unauthorized") {
          dispatch(logoutUser());
          navigate('/login');
          toast.error("Session expired. Please log in again.", {
            position: "top-right",
          });
        } else {
          toast.error(`Failed to ${userToEdit ? "update" : "add"} user: ${error.message}`, {
            position: "top-right",
          });
        }
      });
  };
  

  return (
    <div className="flex flex-col items-center lg:items-start lg:ml-6 mt-8 p-4">
      <h2 className="uppercase text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {userToEdit ? "Edit Student" : "Add New Student"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 w-full"
      >
        <div className="flex flex-col">
          <label htmlFor="name" className="text-gray-700 dark:text-gray-200 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter name..."
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="mobileNumber" className="text-gray-700 dark:text-gray-200 mb-2">Phone</label>
          <input
            type="number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="border-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter phone..."
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-700 dark:text-gray-200 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter email..."
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="role" className="text-gray-700 dark:text-gray-200 mb-2">Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter role..."
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="userId" className="text-gray-700 dark:text-gray-200 mb-2">Student ID</label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="border-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter Student ID..."
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-gray-700 dark:text-gray-200 mb-2">Student ID</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter password..."
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="batch" className="text-gray-700 dark:text-gray-200 mb-2">Batch</label>
          <select
            name="batch"
            className="border-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4"
            value={formData.batch}
            onChange={handleChange}
            required
          >
            <option value="">Select Batch</option>
            {batches.map((batch) => (
              <option key={batch._id} value={batch._id}>
                {batch.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="department" className="text-gray-700 dark:text-gray-200 mb-2">Department</label>
          <select
            name="department"
            className="border-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end w-full mt-6 space-x-4">
          <Link to="/admin/dashboard">
            <button type="button" className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-6 rounded-lg transition">
              Go Back
            </button>
          </Link>
          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition">
            {userToEdit ? "Update" : "Add"}
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default AddStudent;
