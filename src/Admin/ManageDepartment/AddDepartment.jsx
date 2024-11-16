import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  createDepartment,
  updateDepartment,
} from "../../redux/actions/departmentAction";
import toast from "react-hot-toast";

const AddDepartment = () => {
  const location = useLocation();
  const departmentToEdit = location.state?.department;

  const [name, setName] = useState(
    departmentToEdit ? departmentToEdit.name : ""
  );
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      setError("Name is required");
      return;
    }

    const DepartmentData = {
      name,
    };

    if (departmentToEdit) {
      dispatch(
        updateDepartment({
          id: departmentToEdit._id,
          departmentData: DepartmentData,
        })
      )
        .unwrap()
        .then(() => {
          toast.success("Department updated successfully", {
            position: "top-right",
          });
          navigate("/admin/dashboard/department-record");
        })
        .catch((error) => {
          toast.error("Failed to update department: " + error.message, {
            position: "top-right",
          });
        });
    } else {
      dispatch(createDepartment(DepartmentData))
        .unwrap()
        .then(() => {
          toast.success("Department added successfully", {
            position: "top-right",
          });
          navigate("/admin/dashboard/department-record");
        })
        .catch((error) => {
          toast.error("Failed to add department: " + error.message, {
            position: "top-right",
          });
        });
    }

    setName("");
  };

  return (
    <div className="flex flex-col items-center lg:items-start lg:ml-6 mt-8 p-4">
      <h2 className="uppercase text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {departmentToEdit ? "Edit Department" : "Add New Department"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 items-center lg:grid-cols-2 xl:grid-cols-4 gap-6 w-full ">
          <div className="flex flex-col">
            <label
              htmlFor="department-name"
              className="text-gray-700 dark:text-gray-200 mb-2"
            >
              Department Name
            </label>
            <input
              type="text"
              id="name"
              className="border-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter department name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex justify-end w-full mt-6 space-x-4">
            <Link to="/admin/dashboard/department-record">
              <button className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-6 rounded-lg transition">
                Go Back
              </button>
            </Link>

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition"
            >
              {departmentToEdit ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddDepartment;
