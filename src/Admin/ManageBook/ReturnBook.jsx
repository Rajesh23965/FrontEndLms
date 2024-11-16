import React from "react";

const ReturnBook = () => {
  return (
    <>
      <div className="flex flex-col items-center w-full p-4">
        <div className="w-full ">
          <h2 className="uppercase text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Returned books
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <thead>
                <tr className="text-left bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 uppercase text-sm font-semibold">
                  <th className="py-3 px-4 border-b border-r border-gray-300">
                    SID
                  </th>
                  <th className="py-3 px-4 border-b border-r border-gray-300">
                    ISBN
                  </th>
                  <th className="py-3 px-4 border-b border-r border-gray-300">
                    Title
                  </th>
                  <th className="py-3 px-4 border-b border-r border-gray-300">
                    User Name
                  </th>

                  <th className="py-3 px-4 border-b border-r border-gray-300">
                    Returned Date
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  <td className="py-3 px-4 border-b border-r">#07</td>
                  <td className="py-3 px-4 border-b border-r">1234567</td>
                  <td className="py-3 px-4 border-b border-r">Java</td>
                  <td className="py-3 px-4 border-b border-r">
                    Rajesh Kumar Yadav
                  </td>
                  <td className="py-3 px-4 border-b border-r">2081/05/01</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnBook;
