import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBatch, updateBatch } from "../../redux/actions/batchActions";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddBatch = () => {
  const location = useLocation();
  const batchToEdit = location.state?.batch;

  const [name, setName] = useState(batchToEdit ? batchToEdit.name : "");
  const [isStartingYear, setIsStartingYear] = useState(
    batchToEdit
      ? new Date(batchToEdit.startingYear).toISOString().split("T")[0]
      : ""
  );
  const [isEndingYear, setIsEndingYear] = useState(
    batchToEdit
      ? new Date(batchToEdit.endingYear).toISOString().split("T")[0]
      : ""
  );
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !isStartingYear || !isEndingYear) {
      setError("All fields are required");
      return;
    }

    const startingYearDate = new Date(isStartingYear);
    const endingYearDate = new Date(isEndingYear);

    const BatchData = {
      name,
      startingYear: startingYearDate,
      endingYear: endingYearDate,
    };

    // Check if batchToEdit exists, if so, update the batch, otherwise create a new one
    if (batchToEdit) {
      dispatch(updateBatch({ id: batchToEdit._id, batchData: BatchData }))
        .unwrap()
        .then(() => {
          toast.success("Batch updated successfully", {
            position: "top-right",
          });
          navigate("/admin/dashboard/batch-record");
        })
        .catch((error) => {
          toast.error("Failed to update batch: " + error.message, {
            position: "top-right",
          });
        });
    } else {
      dispatch(createBatch(BatchData))
        .unwrap()
        .then(() => {
          toast.success("Batch added successfully", { position: "top-right" });
          navigate("/admin/dashboard/batch-record");
        })
        .catch((error) => {
          toast.error("Failed to add batch: " + error.message, {
            position: "top-right",
          });
        });
    }

    setName("");
    setIsStartingYear("");
    setIsEndingYear("");
  };

  return (
    <>
      <div className="flex flex-col items-center lg:items-start lg:ml-6 mt-8 p-4">
        <h2 className="uppercase text-2xl font-bold text-gray-800 dark:text-white mb-6">
          {batchToEdit ? "Edit Batch" : "Add New Batch"}
        </h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 items-center lg:grid-cols-2 xl:grid-cols-4 gap-6 w-full ">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-gray-700 dark:text-gray-200 mb-2"
              >
                Batch Name
              </label>
              <input
                type="text"
                className="border-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter name..."
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="starting-year"
                className="text-gray-700 dark:text-gray-200 mb-2"
              >
                Starting Year
              </label>
              <input
                type="date"
                id="startingYear"
                className="border-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                name="startingYear"
                value={isStartingYear}
                onChange={(e) => setIsStartingYear(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="ending-year"
                className="text-gray-700 dark:text-gray-200 mb-2"
              >
                Ending Year
              </label>
              <input
                type="date"
                id="isEndingYear"
                className="border-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                name="endingYear"
                value={isEndingYear}
                onChange={(e) => setIsEndingYear(e.target.value)}
              />
            </div>
            <div className="flex justify-end w-full mt-6 space-x-4">
              <Link to="/admin/dashboard/batch-record">
                <button className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-6 rounded-lg transition">
                  Go Back
                </button>
              </Link>
              {/* <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition"
              >
                Add
              </button> */}
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition"
              >
                {batchToEdit ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBatch;
