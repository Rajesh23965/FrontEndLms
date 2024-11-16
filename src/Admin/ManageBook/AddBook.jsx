import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBook, updateBook } from "../../redux/actions/bookAction";
import { fetchCategory } from "../../redux/actions/categoryAction";
import toast from "react-hot-toast";
import ErrorAlert from "../../common/ErrorAlert";

const AddBook = () => {
  const location = useLocation();
  const bookToEdit = location.state?.book;

  const [formData, setFormData] = useState({
    title: bookToEdit ? bookToEdit.title : "",
    author: bookToEdit ? bookToEdit.author : "",
    isbn: bookToEdit ? bookToEdit.isbn : "",
    category: bookToEdit ? bookToEdit.category : "",
    status: bookToEdit ? bookToEdit.status : "Available", 
    publisher: bookToEdit ? bookToEdit.publisher : "",
    description: bookToEdit ? bookToEdit.description : "",
    edition: bookToEdit ? bookToEdit.edition : "",
    files: [],
  });
  

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    categories = [],
    loading,
    error,
  } = useSelector((state) => state.category);

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategory());
    }
  }, [dispatch, categories.length]);

  const handleChange = (e) => {
    if (e.target.name === "files") {
      const files = Array.from(e.target.files);
      const maxFileSize = 2 * 1024 * 1024; // 2MB size limit

      const oversizedFiles = files.filter((file) => file.size > maxFileSize);
      if (oversizedFiles.length > 0) {
        toast.error("File size must not exceed 2MB");
        return;
      }

      setFormData({
        ...formData,
        files: files,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.value = '';  // Reset file input
    }
    // Check for required fields
    if (
      !formData.title ||
      !formData.author ||
      !formData.isbn ||
      !formData.category
    ) {
      toast.error("Title, Author, ISBN, and Category are required");
      return;
    }

    if (bookToEdit) {
      // Update the existing book
      dispatch(updateBook({ id: bookToEdit._id, bookData: formData }))
        .unwrap()
        .then(() => {
          toast.success("Book updated successfully", { position: "top-right" });
          navigate("/admin/dashboard/book-record");
        })
        .catch((error) => {
          toast.error("Failed to update book: " + error.message, {
            position: "top-right",
          });
        });
    } else {
      // Create a new book
      dispatch(createBook(formData))
        .unwrap()
        .then(() => {
          toast.success("Book added successfully", { position: "top-right" });
          navigate("/admin/dashboard/book-record");
          console.log(formData); // Add this before dispatch

        })
        .catch((error) => {
          toast.error("Failed to add book: " + error.message, {
            position: "top-right",
          });
        });
    }

    // Reset form fields
    setFormData({
      title: "",
      author: "",
      isbn: "",
      category: "",
      status: "",
      publisher: "",
      description: "",
      edition: "",
      files: [],
    });

    document.getElementById("fileInput").value = ""; // Reset file input
  };
  return (
    <div className="flex flex-col items-center lg:items-start lg:ml-6 mt-8 p-4">
      <h2 className="uppercase text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {bookToEdit ? "Edit Book" : "Add New Book"}
      </h2>
      <ErrorAlert />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
          {/* Form fields remain same as before, populated with formData values */}
          {/* Title Field */}
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="text-gray-700 dark:text-gray-200 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              className="border-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4"
              placeholder="Enter title..."
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="author"
              className="text-gray-700 dark:text-gray-200 mb-2"
            >
              Author
            </label>
            <input
              type="text"
              name="author"
              className="border-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter author..."
              value={formData.author}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="isbn"
              className="text-gray-700 dark:text-gray-200 mb-2"
            >
              ISBN
            </label>
            <input
              type="text"
              name="isbn"
              className="border-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter ISBN..."
              value={formData.isbn}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="category"
              className="text-gray-700 dark:text-gray-200 mb-2"
            >
              Category
            </label>
            <select
              name="category"
              className="border-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="publisher"
              className="text-gray-700 dark:text-gray-200 mb-2"
            >
              Publisher
            </label>
            <input
              type="text"
              name="publisher"
              className="border-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter publisher..."
              value={formData.publisher}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="files"
              className="text-gray-700 dark:text-gray-200 mb-2"
            >
              Image
            </label>
            <input
              type="file"
              name="files"
              multiple
              className="border-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              id="fileInput" // Ensure this ID matches the one in your JavaScript
              onChange={handleChange}
            />
            
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="edition"
              className="text-gray-700 dark:text-gray-200 mb-2"
            >
              Edition
            </label>
            <input
              type="text"
              name="edition"
              className="border-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter edition..."
              value={formData.edition}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col xl:col-span-4">
            <label
              htmlFor="description"
              className="text-gray-700 dark:text-gray-200 mb-2"
            >
              Description
            </label>
            <textarea
              name="description"
              className="border-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 w-full h-32"
              placeholder="Enter description..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        {/* Submit and Navigation Buttons */}
        <div className="flex justify-end w-full mt-6 space-x-4">
          <Link to="/admin/dashboard/book-record">
            <button className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-6 rounded-lg">
              Go Back
            </button>
          </Link>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white py-2 px-6 rounded-lg"
            disabled={loading}
          >
            {loading ? "Saving..." : bookToEdit ? "Update Book" : "Add Book"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
