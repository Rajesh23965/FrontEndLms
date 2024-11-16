import React from "react";
import Header from "./HomePage/Header";
import MainSection from "./HomePage/MainSection";
import Books from "./BooksLayout/Books";
import {Outlet } from "react-router-dom";

const Layout = ({ showMainSection }) => {
  return (
    <div>
      <Header />
      <div className="flex  flex-col md:flex-row">
        {showMainSection && (
          <div className="hidden md:block">
            <MainSection />
          </div>
        )}

        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
