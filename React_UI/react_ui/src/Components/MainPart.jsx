import React, { useContext } from "react";
import { CiSaveDown1 } from "react-icons/ci";
import axios, { all } from 'axios'
import { ProductData } from "../Context/DataContext";

const MainPart = () => {

  const {alldata , setalldata} = useContext(ProductData)
  return (
    <div className="w-full relative bg-white h-[61%] mt-2 flex justify-center gap-6 px-8 rounded-xl shadow-sm ">
      {/* left part */}

      <div className="h-[70%] w-1/2 mt-5 bg-white">
        <div className="flex items-center gap-2">
          <span className="text-blue-600 text-2xl font-bold">2.</span>
          <h2 className="text-lg font-semibold text-gray-900">
            Select data Column
          </h2>
        </div>

        <div className="flex flex-col gap-4 max-w-md mt-5 pl-6">
          <label className="text-sm font-medium text-gray-700">
            Choose date column
          </label>

          <div className="relative">
            <select
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white 
                 px-4 py-2 pr-10 text-sm text-gray-900
                 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100
                 cursor-pointer"
            >
              <option value="" disabled selected>
                Select a date column
              </option>
              {alldata.map((item) => (
                <option value="created_at">{item}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              ▼
            </span>
          </div>

          <p className="text-xs text-gray-500">
            This column will be used to generate date-based features.
          </p>
        </div>
      </div>

      <div className="h-[70%] w-[0.15%] bg-gray-300 mt-5"></div>

      {/* right part */}
      <div className="w-1/2 bg-white p-5 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-blue-600 text-2xl font-bold">3.</span>
          <h2 className="text-lg font-semibold text-gray-900">
            Select Feature to Generate
          </h2>
        </div>

        <div className="flex w-full gap-6">
          <div className="w-1/2 rounded-xl border border-blue-300 overflow-hidden">
            <div className="bg-[#EFF3FB] w-full text-center py-2 text-sm font-semibold text-gray-700">
              Basic Features
            </div>
            {["Week", "Day", "Day of week", "is Weekend"].map((item) => (
              <div className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-blue-600 scale-150 origin-center"
                />
                {item}
              </div>
            ))}
          </div>

          <div className="w-1/2 rounded-xl border border-blue-300 overflow-hidden">
            <div className="bg-[#EFF3FB] w-full text-center py-2 text-sm font-semibold text-gray-700">
              Advance Features
            </div>
            {[
              "Week Number",
              "Quarter",
              "Days since start",
              "Days since previous",
            ].map((item) => (
              <div className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-blue-600 scale-150 origin-center"
                />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        className="absolute bottom-4 flex items-center gap-3 rounded-2xl bg-blue-600 px-4 py-2 
             text-white shadow-lg shadow-blue-500/30 
             hover:bg-blue-700 hover:shadow-blue-500/40 
             active:scale-95 transition-all cursor-pointer"
      >
        <CiSaveDown1 size={34} />

        <div className="flex flex-col leading-tight">
          <span className="text-lg font-semibold">Download CSV</span>
          <span className="text-xs text-blue-100">Save the output file</span>
        </div>
      </button>
    </div>
  );
};

export default MainPart;
