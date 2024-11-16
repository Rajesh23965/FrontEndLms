import React from "react";

const BorrowBook = () => {
  return (
    <>
      <div className="flex flex-col items-center w-full p-4">
        <div className="w-full ">
          <h2 className="uppercase text-2xl font-bold text-gray-800 dark:text-white mb-6">
            borrowed books
          </h2>
          <p className="">List of borrowed books</p>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <thead>
                <tr className="text-left bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 uppercase text-sm font-semibold">
                  <th className="py-3 px-4 border-b border-r border-gray-300">
                    S.N.
                  </th>
                  <th className="py-3 px-4 border-b border-r border-gray-300">
                    ISBN
                  </th>
                  <th className="py-3 px-4 border-b border-r border-gray-300">
                    Title
                  </th>
                  <th className="py-3 px-4 border-b border-r border-gray-300">
                    Author
                  </th>
                  <th className="py-3 px-4 border-b border-r border-gray-300">
                    Borrowed Date
                  </th>
                  <th className="py-3 px-4 border-b border-r border-gray-300">
                    Due Date
                  </th>
                  <th className="py-3 px-4 border-b border-r border-gray-300">
                    Expiry Date
                  </th>
                  <th className="py-3 px-4 border-b border-r border-gray-300">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  <td className="py-3 px-4 border-b border-r">1</td>
                  <td className="py-3 px-4 border-b border-r">1234567</td>
                  <td className="py-3 px-4 border-b border-r">Java</td>
                  <td className="py-3 px-4 border-b border-r">James Gosling</td>
                  <td className="py-3 px-4 border-b border-r">2081/05/01</td>
                  <td className="py-3 px-4 border-b border-r">2081/05/16</td>
                  <td className="py-3 px-4 border-b border-r">2081/05/17</td>
                  <td className="py-3 px-4 border-b border-r">
                    <button className="px-4 bg-green-800 rounded py-2">
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

export default BorrowBook;
