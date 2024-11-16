import React from "react";

const MainSection = () => {
  return (
    <section className="w-full h-auto h-screen md:w-60 bg-[#0e1730] p-4 text-white">
     
        <h2 className="text-xl font-bold italic mb-2 ">Categories</h2>
        <div className="flex gap-2">
          <input type="checkbox" className="" />
          <p className="">All</p>
        </div>
        <div className="flex gap-2">
          <input type="checkbox" className="" />
          <p className="">Computer Science</p>
        </div>
        <div className="flex gap-2">
          <input type="checkbox" className="" />
          <p className="">Chemistry</p>
        </div>
        <div className="flex gap-2">
          <input type="checkbox" className="" />
          <p className="">Mathematics</p>
        </div>
        <div className="flex gap-2">
          <input type="checkbox" className="" />
          <p className="">Physics</p>
        </div>
        <div className="flex gap-2">
          <input type="checkbox" className="" />
          <p className="">Bilogy</p>
        </div>
   
     
    </section>
  );
};

export default MainSection;
