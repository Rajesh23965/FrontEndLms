import React from "react";
import { Link } from "react-router-dom";

const IssuedBook = () => {
  return (
    <>
      <div className="flex flex-col items-center w-full p-4">
        <div className="w-full ">
          <h2 className="uppercase text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Issued Books
          </h2>

          <div className="flex justify-end gap-4 mb-4">
            <Link to="/admin/dashboard/issue-new-book">
              <button className="uppercase bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition">
                Issue Book
              </button>
            </Link>
            <button className="uppercase bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition">
              Export to CSV
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:flex lg:justify-between lg:space-x-2 w-full gap-2 mb-6">
            <input
              type="search"
              className="border-2 w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Search by ISBN"
              aria-label="Search by ISBN"
            />
            <input
              type="search"
              className="border-2 w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Search by student id"
              aria-label="Search by student id"
            />
            <input
              type="search"
              className="border-2 w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Search by email"
              aria-label="Search by email"
            />
            <button
              type="button"
              className="bg-gray-500 px-8 hover:bg-gray-600 text-white p-2 rounded-lg transition col-span-1 md:col-span-3 lg:flex-shrink-0 lg:w-auto"
              onClick={() => {}}
            >
              Clear
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <thead>
                <tr className="text-left bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 uppercase text-sm font-semibold">
                  <th className="py-3 px-4 border-b border-r border-gray-300">
                    ISBN
                  </th>
                  <th className="py-3 px-4 border-b border-r border-gray-300">
                    SID
                  </th>
                  <th className="py-3 px-4 border-b border-r border-gray-300">
                    Issued Date
                  </th>
                  <th className="py-3 px-4 border-b border-r border-gray-300">
                    Due Date
                  </th>
                  <th className="py-3 px-4 border-b border-r border-gray-300 text-center">
                    Fine
                  </th>
                  <th className="py-3 px-4 border-b border-r border-gray-300 text-center">
                    Fine Status
                  </th>
                  <th className="py-3 px-4 border-b border-r border-gray-300 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  <td className="py-3 px-4 border-b border-r">102</td>
                  <td className="py-3 px-4 border-b border-r">SID-111</td>
                  <td className="py-3 px-4 border-b border-r">2081-05-01</td>
                  <td className="py-3 px-4 border-b border-r">2081-05-16</td>
                  <td className="py-3 px-4 border-b border-r text-center">Rs.20</td>
                  <td className="py-3 px-4 border-b border-r text-center">
                    <button className="px-4 py-2 rounded text-xl text-white bg-green-800">Not Paid</button>
                  </td>
                  <td className="py-3 px-4 border-b text-center borde">
                    <button className=" text-red-500 hover:text-red-700 mx-1 px-4 py-2 rounded text-xl bg-green-800 font-bold">
                      Pay Fine
                    </button>
                    <button className="text-white hover:text-gray-700 mx-1 px-4 py-2 rounded text-xl bg-green-800">
                      Return
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default IssuedBook;
