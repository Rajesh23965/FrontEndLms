import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookDetail from "./pages/BooksLayout/BookDetail";
import Books from "./pages/BooksLayout/Books";
import Layout from "./pages/Layout";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/Login/ForgotPassword";
import { Toaster } from "react-hot-toast";
import { updateUser } from "./redux/actions/authAction.js";
import AdminLayout from "./Admin/AdminLayout/AdminLayout";
import Dashboard from "./Admin/AdminDashboard/Dashboard";
import AddBook from "./Admin/ManageBook/AddBook";
import BookRecords from "./Admin/ManageBook/BookRecords";
import { useDispatch, useSelector } from "react-redux";
import StudentLayout from "./Student/StudentLayout.jsx";
import BorrowBook from "./Admin/ManageBook/BorrowBook.jsx";
import IssuedBook from "./Admin/ManageBook/IssuedBook.jsx";
import IssueBook from "./Admin/ManageBook/IssueBook.jsx";
import ReturnBook from "./Admin/ManageBook/ReturnBook.jsx";
import StudentRecord from "./Admin/ManageStudent/StudentRecord.jsx";
import AddStudent from "./Admin/ManageStudent/AddStudent.jsx";
import Batch from "./Admin/ManageBatch/Batch.jsx";
import AddBatch from "./Admin/ManageBatch/AddBatch.jsx";
import Department from "./Admin/ManageDepartment/Department.jsx";
import AddDepartment from "./Admin/ManageDepartment/AddDepartment.jsx";
import AddCategory from "./Admin/ManageBook/AddCategory.jsx";
import CategoryRecord from "./Admin/ManageBook/CategoryRecord.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import ChangePassword from "./pages/Profile/ChangePassword.jsx";

const App = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(updateUser());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout showMainSection={true} />}>
          <Route index element={<Books />} />
        </Route>

        {/* Dynamic BookDetail Route */}
        <Route path="/book-detail/:bookId" element={<Layout showMainSection={false} />}>
          <Route index element={<BookDetail />} />
        </Route>

        {/* Define Forgot Password Route Separately */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Admin Protected Routes */}
        {user && user.role === 'admin' && (
          <Route path="/admin/dashboard" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-new-book" element={<AddBook />} />
            <Route path="book-record" element={<BookRecords />} />
            <Route path="borrowed-book" element={<BorrowBook />} />
            <Route path="issued-book" element={<IssuedBook />} />
            <Route path="issue-new-book" element={<IssueBook />} />
            <Route path="return-book" element={<ReturnBook />} />
            <Route path="add-new-student" element={<AddStudent />} />
            <Route path="student-record" element={<StudentRecord />} />
            <Route path="add-new-batch" element={<AddBatch />} />
            <Route path="batch-record" element={<Batch />} />
            <Route path="department-record" element={<Department />} />
            <Route path="add-new-department" element={<AddDepartment />} />
            <Route path="add-category" element={<AddCategory />} />
            <Route path="category-record" element={<CategoryRecord />} />
            <Route path="user-profile" element={<Profile/>}/>
            <Route path="change-password" element={<ChangePassword/>}/>
           
          </Route>
        )}

        {/* Student Protected Routes */}
        {user && user.role === 'student' && (
          <Route path="/student/dashboard" element={<StudentLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
