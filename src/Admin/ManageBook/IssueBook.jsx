import React from "react";
import {Link} from 'react-router-dom'
const IssueBook = () => {
  return (
    <div className="">
        <Link to="/admin/dashboard/issued-book">
        
        <button className="px-6 bg-green-800 py-2 rounded text-white">Go Back</button>
        </Link>
      <div className="">
        <h2 className="uppercase text-3xl font-bold text-gray-800 dark:text-white mb-6">
          issue Books
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Search Student Section */}
        <div>
          <h2 className="uppercase text-xl font-bold text-gray-800 dark:text-white mb-2">
            Search Student
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Find the student you want to issue books to.
          </p>
          <div className="space-y-4">
            <input
              type="search"
              className="border-2 w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Search by Student ID"
              aria-label="Search by Student ID"
            />
            <input
              type="search"
              className="border-2 w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Search by Name"
              aria-label="Search by Name"
            />
            <button className="bg-green-500 text-white py-2 px-14 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 ">
              Search
            </button>
            <p className="">Name: <span>Rajesh Kumar Yadav</span></p>
            <p className="">Student ID:#07 <span></span></p>
            <p className="">Email: <span>rajeshky123456@gmail.com</span></p>
            <p className="">Role: <span>7629020</span></p>
            <p className="">Account Status: <span>Acitve</span></p>
            <p className="">Borrowed: <span>No</span></p>
          </div>
        </div>
        {/* Search Books Section */}
        <div>
          <h2 className="uppercase text-xl font-bold text-gray-800 dark:text-white mb-2">
            Search Books
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Find the book you want to issue to the student.
          </p>
          <div className="space-y-4">
            <input
              type="search"
              className="border-2 w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Search by ISBN"
              aria-label="Search by ISBN"
            />
            <input
              type="search"
              className="border-2 w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Search by Title"
              aria-label="Search by Title"
            />
            <button className="bg-green-500 text-white py-2 px-14 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 ">
              Search
            </button>
            <p className="">ISBN: <span>#1234</span></p>
            <p className="">Title: <span>Java</span></p>
            <p className="">Author: <span>James Gosling</span></p>
            <p className="">Status: <span>Available</span></p>
            <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 w-full ">
              Issued Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueBook;
