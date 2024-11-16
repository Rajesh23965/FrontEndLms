import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  createCategory,
  updateCategory,
} from "../../redux/actions/categoryAction";

const AddCategory = () => {
  const location = useLocation();
 
  const categoryToEdit = location.state?.category; 

  const [name, setName] = useState(categoryToEdit ? categoryToEdit.name : "");
  const [bookCount, setBookCount] = useState(
    categoryToEdit ? categoryToEdit.bookCount : ""
  );
  const [description, setDescription] = useState(
    categoryToEdit ? categoryToEdit.description : ""
  );
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!name || !bookCount) {
      setError("Name And BookCount are required");
      return;
    }
  
    const CategoryData = {
      name,
      bookCount,
      description,
    };
  
    if (categoryToEdit) {
      dispatch(updateCategory({ id: categoryToEdit._id, categoryData: CategoryData }))
        .unwrap()
        .then(() => {
          toast.success("Category updated successfully", { position: "top-right" });
          navigate("/admin/dashboard/category-record");
        })
        .catch((error) => {
          toast.error("Failed to update category: " + error.message, { position: "top-right" });
        });
    } else {
      dispatch(createCategory(CategoryData))
        .unwrap()
        .then(() => {
          toast.success("Category added successfully", { position: "top-right" });
          navigate("/admin/dashboard/category-record");
        })
        .catch((error) => {
          toast.error("Failed to add category: " + error.message, { position: "top-right" });
        });
    }
  

    setName("");
    setBookCount("");
    setDescription("");
  };
  
  return (
    <>
     <div className="flex flex-col items-center w-full min-h-screen p-8 bg-gray-50">
  <h2 className="uppercase text-3xl font-bold text-green-600 mb-10">{categoryToEdit ? "Edit Category" : "Add Category"}</h2>

  <form className="w-full max-w-4xl space-y-6" onSubmit={handleSubmit}>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* Category Name Field */}
      <div className="flex flex-col">
        <label htmlFor="name" className="text-gray-700 font-semibold mb-2">Category Name</label>
        <input
          type="text"
          id="name"
          className="border-2 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow shadow-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name..."
        />
      </div>

      {/* Book Count Field */}
      <div className="flex flex-col">
        <label htmlFor="bookCount" className="text-gray-700 font-semibold mb-2">Book Quantity</label>
        <input
          type="number"
          id="bookCount"
          className="border-2 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow shadow-sm"
          value={bookCount}
          onChange={(e) => setBookCount(e.target.value)}
          placeholder="Enter book quantity"
        />
      </div>

      {/* Description Field */}
      <div className="flex flex-col lg:col-span-3">
        <label htmlFor="description" className="text-gray-700 font-semibold mb-2">Description</label>
        <textarea
          id="description"
          className="border-2 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow shadow-sm h-32"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description..."
        />
      </div>
    </div>

    {/* Submit Buttons */}
    <div className="flex justify-end space-x-4">
      <Link to="/admin/dashboard/category-record">
        <button className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-6 rounded-lg transition">Go Back</button>
      </Link>
      <button type="submit" className="bg-green-500 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition">
        {categoryToEdit ? "Update" : "Add"}
      </button>
    </div>
  </form>
</div>

    </>
  );
};

export default AddCategory;
