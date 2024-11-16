import React, { useState } from "react";
import { GiBookAura } from "react-icons/gi";
import { Link } from "react-router-dom";
import Login from "../Login/Login";
import ChangePassword from "../Profile/ChangePassword";

const Header = () => {
  const [isModalOpen,setIsModalopen]=useState(false);
  const handleModalOpen=()=>{
    setIsModalopen(true);
  }
  const handleModalClose=()=>{
    setIsModalopen(false);
  };
  return (
    <>
    <header className="sticky top-0 z-50 bg-[#0e1730]" >
      <nav className="flex justify-between items-center p-4 text-lg md:text-xl lg:text-2xl">
        
        <div className="flex items-center gap-2 md:gap-4 text-[#30c2a1] font-bold">
            <GiBookAura size={32} className="md:w-10 md:h-10"/>
            <h3 className="text-sm sm:text-base md:text-xl lg:text-2xl">RDGJ Library </h3>
        </div>

        <div className="flex gap-4 sm:gap-6 md:gap-8 items-center">
        <Link to="/">
        
        <p className="text-xs sm:text-sm md:text-xl text-white  font-bold hover:text-[#30c2a1] cursor-pointer hover:border-b-2 hover:border-[#30c2a1]" >Books</p>  
        </Link>
        {/* <p className="hover:text-green-600 cursor-pointer hover:border-b-2">e-Books</p> */}
        
        
        <button onClick={handleModalOpen} className="bg-[#30c2a1]  font-bold  text-xs sm:text-sm md:text-base text-white px-4 sm:px-5 py-1.5 rounded-lg transition duration-200 ease-in-out hover:bg-[#108f72]">Login</button>
       
        </div>
      </nav>
    </header>
    {isModalOpen && <Login onClose={handleModalClose}/>}
    
</>
  );
};

export default Header;
