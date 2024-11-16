import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBatches, deleteBatch } from "../../redux/actions/batchActions.js";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ErrorAlert from "../../common/ErrorAlert";
import toast from "react-hot-toast";

const Batch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { batches = [], loading, error } = useSelector((state) => state.batch);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch batches on component mount
  useEffect(() => {
    dispatch(fetchBatches());
  }, [dispatch]);

  // Handle batch deletion
  const handleDelete = (id) => {
    dispatch(deleteBatch({ id }))
      .unwrap()
      .then(() => {
        toast.success("Batch deleted successfully");
      })
      .catch((err) => {
        toast.error(`Failed to delete batch: ${err}`);
      });
  };

  // Handle batch edit
  const handleEdit = (batch) => {
    console.log("Editing batch:", batch); // Log batch data for debugging
    navigate("/admin/dashboard/add-new-batch", { state: { batch } });
  };

  // Toggle export dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // PDF Report Generation
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Batch Details", 20, 10);

    const headers = [["S.No", "Batch Name", "Start Year", "End Year"]];

    const data = batches.map((batch, index) => [
      index + 1,
      batch.name,
      batch.startingYear,
      batch.endingYear,
    ]);

    doc.autoTable({
      head: headers,
      body: data,
      startY: 20,
      theme: "grid",
    });
    doc.save("batch.pdf");
  };

  // Print Batch Table
  const printDepartments = () => {
    const tableContent = document.querySelector(".batch-table").outerHTML;
    const printWindow = window.open("", "", "width=800,height=600");

    printWindow.document.write(`
      <html>
        <head>
          <title>Batch Details</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
          </style>
        </head>
        <body>
          <h2>Batch Details</h2>
          ${tableContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  // Handle error or loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  return (
    <div className="flex flex-col items-center w-full p-4">
      <div className="w-full">
        <h2 className="uppercase text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Manage Batch
        </h2>
        <ErrorAlert />
        <div className="flex justify-end gap-4 mb-4">
          <Link to="/admin/dashboard/add-new-batch">
            <button className="uppercase bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition">
              Add Batch
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
          className={`absolute right-8 bg-white dark:bg-gray-800 dark:divide-gray-700 shadow-lg p-2 w-40 rounded-lg ${
            isDropdownOpen ? "block" : "hidden"
          }`}
        >
          <CSVLink
            data={batches.map(({ name, startingYear, endingYear }) => ({
              name,
              startingYear,
              endingYear,
            }))}
            filename={"batch.csv"}
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
          <table className="min-w-full table-auto border-collapse bg-white dark:bg-gray-800 rounded-lg shadow-lg batch-table">
            <thead>
              <tr className="text-left bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 uppercase text-sm font-semibold">
                <th className="py-3 px-4 border-b border-r border-gray-300">
                  <input type="checkbox" />
                </th>
                <th className="py-3 px-4 border-b border-r border-gray-300">S.N.</th>
                <th className="py-3 px-4 border-b border-r border-gray-300">Name</th>
                <th className="py-3 px-4 border-b border-r border-gray-300">Start Year</th>
                <th className="py-3 px-4 border-b border-r border-gray-300">End Year</th>
                <th className="py-3 px-4 border-b border-r border-gray-300 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((batch, index) => (
                <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  <td className="py-3 px-4 border-b border-r">
                    <input type="checkbox" />
                  </td>
                  <td className="py-3 px-4 border-b border-r">{index + 1}</td>
                  <td className="py-3 px-4 border-b border-r">{batch.name}</td>
                  <td className="py-3 px-4 border-b border-r">{batch.startingYear}</td>
                  <td className="py-3 px-4 border-b border-r">{batch.endingYear}</td>
                  <td className="py-3 px-4 border-b text-center">
                    <button className="text-blue-500 hover:text-blue-700 mx-1" onClick={() => handleEdit(batch)}>
                      <FaEdit size={20} />
                    </button>
                    <button className="text-red-500 hover:text-red-700 mx-1" onClick={() => handleDelete(batch._id)}>
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

export default Batch;
