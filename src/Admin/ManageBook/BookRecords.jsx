import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, deleteBook } from "../../redux/actions/bookAction.js";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";

const BookRecords = () => {
  const dispatch = useDispatch();
  const { books=[], loading, error } = useSelector((state) => state.book);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const navigate=useNavigate();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleDelete =async (id) => {
    try {
      await dispatch(deleteBook(id)).unwrap();
      console.log("Book deleted successfully");
    } catch (err) {
      console.error("Error deleting book:", err);
    }
    
  };

    // Handle edit
    const handleEdit = (book) => {
      navigate("/admin/dashboard/add-new-book", { state: { book } });
    };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Book Details", 20, 10);

    const headers = [["S.No", "Title", "Author", "ISBN", "Publisher"]];

    // Initialize table data
    const data = books.map((book, index) => [
      index + 1,
      book.title,
      book.author,
      book.isbn,
      book.publisher
    ]);

    // Create PDF table
    doc.autoTable({
      head: headers,
      body: data,
      startY: 20,
      theme: "grid",
    });

    doc.save("book_records.pdf");
  };
    // Print Batch Table
    const printDepartments = () => {
      const tableContent = document.querySelector(".book-table").outerHTML;
      const printWindow = window.open("", "", "width=800,height=600");
  
      printWindow.document.write(`
        <html>
          <head>
            <title>Books Details</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              table { width: 100%; border-collapse: collapse; }
              th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
            </style>
          </head>
          <body>
            <h2>Books Details</h2>
            ${tableContent}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="flex flex-col items-center w-full p-4">
        <div className="w-full ">
          <h2 className="uppercase text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Manage Books
          </h2>

          <div className="flex justify-end gap-4 mb-4">
            <Link to="/admin/dashboard/add-new-book">
              <button className="uppercase bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition">
                Add New
              </button>
            </Link>
            <button className="uppercase bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition" onClick={toggleDropdown}>
              Export
            </button>
          </div>

          <div className={`absolute right-8 bg-white dark:bg-gray-800 shadow-lg p-2 mr-0 w-40 rounded-lg ${isDropdownOpen ? "block" : "hidden"}`}>
            <CSVLink data={books} filename={"books.csv"} className="block p-2 cursor-pointer">
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
            <table className="min-w-full table-auto border-collapse bg-white dark:bg-gray-800 rounded-lg shadow-lg book-table">
              <thead>
                <tr className="text-left bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 uppercase text-sm font-semibold">
                  <th className="py-3 px-4 border-b border-r border-gray-300">ISBN</th>
                  <th className="py-3 px-4 border-b border-r border-gray-300">Title</th>
                  <th className="py-3 px-4 border-b border-r border-gray-300">Author</th>
                  <th className="py-3 px-4 border-b border-r border-gray-300">Status</th>
                  <th className="py-3 px-4 border-b border-r border-gray-300 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books && books.map((book) => (
                  <tr className="hover:bg-gray-100 dark:hover:bg-gray-700 transition" key={book._id}>
                    <td className="py-3 px-4 border-b border-r">{book.isbn}</td>
                    <td className="py-3 px-4 border-b border-r">{book.title}</td>
                    <td className="py-3 px-4 border-b border-r">{book.author}</td>
                    <td className="py-3 px-4 border-b border-r">{book.status}</td>
                    <td className="py-3 px-4 border-b text-center">
                      <button onClick={()=>handleEdit(book)} className="text-blue-500 hover:text-blue-700 mx-1">
                        <FaEdit size={20} />
                      </button>
                      <button onClick={() => handleDelete(book._id)} className="text-red-500 hover:text-red-700 mx-1">
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
    </>
  );
};

export default BookRecords;
