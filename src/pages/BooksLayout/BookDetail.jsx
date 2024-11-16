import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Java from "../../assets/java.jpeg"; // Replace with a placeholder image or remove if not used

const BookDetail = () => {
  const { bookId } = useParams(); // Get the bookId from the URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/books/${bookId}`);
        setBook(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div className="p-4 w-full">
      <div>
        <Link to="/">
          <button className="bg-[#30c2a1] px-6 py-2 rounded text-white">Go Back</button>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 mt-6">
        <div className="w-full lg:w-1/3">
          <img src={book.files[0]?.filePath || Java} alt={book.title} className="w-full h-auto lg:h-full" />
        </div>
        <div className="text-xl md:text-xl space-y-4 w-full lg:w-2/3">
          <h2 className="font-bold text-2xl md:text-3xl">{book.title}</h2>
          <p>ISBN is: <span className="font-medium">{book.isbn}</span></p>
          <p>Author : <span className="font-medium">{book.author}</span></p>
          <p>Status: <span className="font-medium">{book.status}</span></p>
          <p>Edition: <span className="font-medium">{book.edition}</span></p>
          <p>Publisher: <span className="font-medium">{book.publisher}</span></p>
          <p>Description: <span className="font-medium">{book.description}</span></p>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
