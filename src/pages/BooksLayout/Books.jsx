import React, { useEffect, useState } from "react";
import Java from "../../assets/java.jpeg";
import Algorithm from "../../assets/algorithms.jpeg";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import axios from "axios";

const Books = () => {
  const [books, setBooks] = useState([]);

  // Fetch books on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/books/all");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className="p-4">
      <div className="bg-white sm:grid sm:grid-cols-1 md:flex md:justify-between items-center mb-4 p-2 rounded-xl shadow-md">
        <div className="">
          <h2 className="text-xl font-bold">Books</h2>
          <p className="">Book Lists</p>
        </div>
        <div className="flex items-center text-lg mb-6 md:mb-8 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CiSearch size={24} className="text-white" />
          </div>
          <input
            type="text"
            id="search"
            className="bg-[#0e1730] text-white rounded-lg pl-12 py-2 md:py-4 focus:outline-none w-full"
            placeholder="Search books..."
          />
        </div>
      </div>
      
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book._id} className="bg-[#0e1730] text-white p-4 transition-transform transform hover:scale-105 rounded-lg shadow-md">
            <img src={book.coverImage || Java} alt={book.title} className="w-full h-48 object-cover" />
            <h2 className="text-xl font-bold mt-2">{book.title}</h2>
            <p className="">{book.author}</p>
            <div className="">
              <Link to={`/book-detail/${book._id}`}>
                <button className="bg-[#30c2a1] text-white px-5 py-1.5 rounded-lg mt-4">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
