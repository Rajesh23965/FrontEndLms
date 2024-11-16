import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { IoMdEyeOff } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable"; 
import { deleteUser, fetchUser } from "../../redux/actions/authAction";
import ErrorAlert from "../../common/ErrorAlert";
import toast from "react-hot-toast";

const Department = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users = [], loading, error } = useSelector((state) => state.auth);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Fetch departments on component mount
  useEffect(() => {
    dispatch(fetchUser())
      .unwrap()
      .catch((err) => {
        console.error("Failed to fetch users:", err);
      });
  }, [dispatch]);
  
  
console.log("Fetched users:", users);
console.log("Loading state:", loading);
console.log("Error state:", error);

  // Handle delete
  const handleDelete = (id) => {
    dispatch(deleteUser({ id }))
      .unwrap()
      .then(() => {
        toast.success("Department deleted successfully");
      })
      .catch((err) => {
        toast.error(`Failed to delete department: ${err}`);
      });
  };

  // Handle edit
  const handleEdit = (auth) => {
    navigate("/admin/dashboard/add-new-student", { state: { auth } });
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Generate PDF with department data
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Department Details", 20, 10);

    const headers = [["S.No", "Department Name"]];
    const data = users.map((dept, index) => [index + 1, dept.name]);

    doc.autoTable({
      head: headers,
      body: data,
      startY: 20,
      theme: "grid",
    });

    doc.save("departments.pdf");
  };

  // Print only department table
  const printDepartments = () => {
    const tableContent = document.querySelector(".department-table").outerHTML;

    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Department Details</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
          </style>
        </head>
        <body>
          <h2>Department Details</h2>
          ${tableContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="flex flex-col items-center w-full p-4">
      <div className="w-full">
        <h2 className="uppercase text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Department Details
        </h2>
        <ErrorAlert />
        <div className="flex justify-end gap-4 mb-4">
          <Link to="/admin/dashboard/add-new-student">
            <button className="uppercase bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition">
              Add Department
            </button>
          </Link>
          <button
            onClick={toggleDropdown}
            className="uppercase bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
          >
            Export
          </button>
        </div>

        <div
          className={`absolute right-8 bg-white dark:bg-gray-800 dark:divide-gray-700 shadow-lg  p-2 mr-0 w-40 rounded-lg ${
            isDropdownOpen ? "block" : "hidden"
          }`}
        >
          <CSVLink
            data={users}
            filename={"departments.csv"}
            className="block p-2 cursor-pointer"
          >
            Export to CSV
          </CSVLink>
          <button onClick={generatePDF} className="block p-2 w-full text-left">
            Export to PDF
          </button>
          <button onClick={printDepartments} className="block p-2 w-full text-left">
            Print
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse bg-white dark:bg-gray-800 rounded-lg shadow-lg department-table">
            <thead>
              <tr className="text-left bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 uppercase text-sm font-semibold">
                <th className="py-3 px-4  border-l  border-b border-r border-gray-300">
                  <input type="checkbox" className="" />
                </th>
                <th className="py-3 px-4 border-b border-r border-gray-300">
                  S.N.
                </th>
                <th className="py-3 px-4 border-b border-r border-gray-300">
                  Department
                </th>
                <th className="py-3 px-4 border-b border-r border-gray-300 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                users.map((department, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 transition "
                  >
                    <td className="py-3 px-4 w-10  border-l border-b border-r">
                      <input type="checkbox" className="" />
                    </td>
                    <td className="py-3 px-4 border-b border-r">{index + 1}</td>
                    <td className="py-3 px-4 border-b border-r">
                      {department.name}
                    </td>
                    <td className="py-3 px-4 border-b text-center">
                      <button
                        onClick={() => handleEdit(department)}
                        className="text-blue-500 hover:text-blue-700 mx-1"
                      >
                        <FaEdit size={20} />
                      </button>

                      <button
                        onClick={() => handleDelete(department._id)}
                        className="text-red-500 hover:text-red-700 mx-1"
                      >
                        <MdDelete size={20} />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700 mx-1">
                        <IoMdEyeOff size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Department;
