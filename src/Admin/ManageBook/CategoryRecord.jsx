import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory, deleteCategory } from "../../redux/actions/categoryAction";
import toast from "react-hot-toast";
import ErrorAlert from "../../common/ErrorAlert";

const CategoryRecord = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories = [], loading, error } = useSelector((state) => state.category);

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  // Handle delete
  const handleDelete = (id) => {
    dispatch(deleteCategory({ id }))
      .unwrap()
      .then(() => {
        toast.success("Category deleted successfully");
      })
      .catch((err) => {
        toast.error(`Failed to delete category: ${err}`);
      });
  };

  // Handle edit
  const handleEdit = (category) => {
    navigate("/admin/dashboard/add-category", { state: { category } });
  };

  return (
    <div className="flex flex-col items-center w-full p-4 bg-gray-50 min-h-screen">
  {/* Add Category Button */}
  <div className="mt-8">
    <Link to="/admin/dashboard/add-category">
      <button className="bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-lg transition-transform duration-300 hover:scale-105 shadow-md">
        + Add Category
      </button>
    </Link>
  </div>

  {/* Error Alert */}
  <ErrorAlert />

  {/* Loading and error handling */}
  {loading ? (
    <p className="text-gray-500 mt-4 text-lg animate-pulse">Loading categories...</p>
  ) : error ? (
    <p className="text-red-500 mt-4 text-lg">{error}</p>
  ) : (
    <div className="overflow-x-auto w-full mt-6">
      {categories.length > 0 ? (
        <table className="min-w-full table-auto border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-green-600 text-white text-left uppercase text-sm font-semibold">
              <th className="py-4 px-6">S.N.</th>
              <th className="py-4 px-6">Category Name</th>
              <th className="py-4 px-6">Book Count</th>
              <th className="py-4 px-6">Description</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id} className="hover:bg-gray-100 transition-all duration-200">
                <td className="py-4 px-6 border-b">{index + 1}</td>
                <td className="py-4 px-6 border-b">{category.name}</td>
                <td className="py-4 px-6 border-b">{category.bookCount}</td>
                <td className="py-4 px-6 border-b">{category.description}</td>
                <td className="py-4 px-6 border-b text-center flex justify-center space-x-4">
                  <button onClick={() => handleEdit(category)} className="text-blue-500 hover:text-blue-700 transition-transform duration-200 hover:scale-110">
                    <FaEdit size={20} />
                  </button>
                  <button onClick={() => handleDelete(category._id)} className="text-red-500 hover:text-red-700 transition-transform duration-200 hover:scale-110">
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600 mt-6">No categories available</p>
      )}
    </div>
  )}
</div>

  );
};

export default CategoryRecord;
