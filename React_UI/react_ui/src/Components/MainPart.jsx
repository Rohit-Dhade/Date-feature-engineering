import React, { useContext, useEffect, useState } from "react";
import { CiSaveDown1 } from "react-icons/ci";
import axios, { all } from "axios";
import { ProductData } from "../Context/DataContext";
import Loader from './Loader'

const MainPart = () => {
  const [OptionsSelected, setOptionsSelected] = useState([]);
  const [date_column, setdate_column] = useState("");
  const { alldata, setalldata } = useContext(ProductData);
  const [icon, seticon] = useState(1);

  useEffect(() => {
    if (alldata === undefined) return;
  }, [OptionsSelected, alldata]);

  const SendData = async () => {
    // if(!alldata.file) return;
    try {
      const formData = new FormData();

      formData.append("file", alldata.file);
      formData.append("features_selected", JSON.stringify(OptionsSelected || []));

      const API_BASE = import.meta.env.VITE_API_BASE_URL
      const response = await axios.post(
        `${API_BASE}/file-upload`,
        formData,
        { responseType: "blob" },
      );

      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = "generated_features.csv";
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  return (
    <div className="w-full relative bg-white h-[61%] mt-2 flex justify-center gap-6 px-8 rounded-xl shadow-sm ">

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
              defaultValue={"Select a date column"}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white 
                 px-4 py-2 pr-10 text-sm text-gray-900
                 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100
                 cursor-pointer"
            >
              <option value="">Select a date column</option>
              {alldata.columns_data.map((item) => (
                <option
                  onClick={(e) => {
                    setdate_column(e.target.value);
                  }}
                  key={item}
                  value={item}
                >
                  {item}
                </option>
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
            {["Week", "Day", "Year", "Month", "Day name"].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                <input
                  onChange={(e) => {
                    e.target.checked
                      ? setOptionsSelected((prev) => [...prev, item])
                      : prev.filter((i) => i !== item);
                  }}
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
              "Qaurter",
              "Days since start",
              "is Weekend",
              "Day of week"
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                <input
                  onChange={(e) => {
                    e.target.checked
                      ? setOptionsSelected((prev) => [...prev, item])
                      : prev.filter((i) => i !== item);
                  }}
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
        onClick={() => {
          (setalldata((prev) => ({
            ...prev,
            features_selected: OptionsSelected,
          })),
            SendData()); seticon(prev => (prev === 1 ? 2 : 1));
        }}
        className="absolute bottom-4 flex items-center gap-3 rounded-2xl bg-blue-600 px-4 py-2 
             text-white shadow-lg shadow-blue-500/30 
             hover:bg-blue-700 hover:shadow-blue-500/40 
             active:scale-95 transition-all cursor-pointer justify-center"
      >
        {icon === 1 && <CiSaveDown1 size={34} />}
        {icon === 2 && <Loader />}

        <div className="flex flex-col leading-tight">
          <span className="text-lg font-semibold">Download CSV</span>
          <span className="text-xs text-blue-100">Save the output file</span>
        </div>
      </button>
    </div>
  );
};

export default MainPart;
