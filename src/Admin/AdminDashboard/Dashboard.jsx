import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div className="flex justify-center lg:ml-4 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Link to="/admin/dashboard/add-new-book">
            <div className="box-content h-28 w-44 p-4 font-mono font-bold border-4 text-white text-center bg-[#0e1730] hover:bg-[#1a274a] flex flex-col gap-2 rounded-lg transition duration-300">
              <span className="text-xl">Total Books</span>
              <span className="text-2xl">10</span>
              <button type="button" className="text-[#30c2a1] hover:text-[#26a188] transition">
                View All
              </button>
            </div>
          </Link>
          
          <div className="box-content h-28 w-44 p-4 font-mono font-bold border-4 text-white text-center bg-[#0e1730] hover:bg-[#1a274a] flex flex-col gap-2 rounded-lg transition duration-300">
            <span className="text-xl">Issued Books</span>
            <span className="text-2xl">5</span>
            <button type="button" className="text-[#30c2a1] hover:text-[#26a188] transition">
              View All
            </button>
          </div>
          
          <div className="box-content h-28 w-44 p-4 font-mono font-bold border-4 text-white text-center bg-[#0e1730] hover:bg-[#1a274a] flex flex-col gap-2 rounded-lg transition duration-300">
            <span className="text-xl">Reserved Books</span>
            <span className="text-2xl">2</span>
            <button type="button" className="text-[#30c2a1] hover:text-[#26a188] transition">
              View All
            </button>
          </div>

          <div className="box-content h-28 w-44 p-4 font-mono font-bold border-4 text-white text-center bg-[#0e1730] hover:bg-[#1a274a] flex flex-col gap-2 rounded-lg transition duration-300">
            <span className="text-xl">e-Books</span>
            <span className="text-2xl">15</span>
            <button type="button" className="text-[#30c2a1] hover:text-[#26a188] transition">
              View All
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
