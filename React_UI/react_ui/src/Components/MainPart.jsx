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
    <div className="w-full flex justify-center">
      <div
        className="
        w-full 
        max-w-6xl
        bg-white 
        mt-2 
        relative
        flex 
        flex-col 
        lg:flex-row 
        gap-6 
        px-4 sm:px-6 lg:px-8 
        py-6
        rounded-xl 
        shadow-sm
      "
      >

        <div className="w-full lg:w-1/2">
          <div className="flex items-center gap-2">
            <span className="text-blue-600 text-xl sm:text-2xl font-bold">2.</span>
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              Select data Column
            </h2>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-md mt-5 sm:pl-6">
            <label className="text-sm font-medium text-gray-700">
              Choose date column
            </label>

            <div className="relative">
              <select
                onChange={(e) => setdate_column(e.target.value)}
                className="
                w-full appearance-none rounded-lg 
                border border-gray-300 bg-white 
                px-4 py-2 pr-10 text-sm text-gray-900
                focus:border-blue-500 focus:outline-none 
                focus:ring-2 focus:ring-blue-100
              "
              >
                <option value="">Select a date column</option>
                {alldata.columns_data.map((item) => (
                  <option key={item} value={item}>
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


        <div className="hidden lg:block w-px bg-gray-300 self-stretch" />


        <div className="w-full lg:w-1/2 pb-20">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-600 text-xl sm:text-2xl font-bold">3.</span>
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              Select Feature to Generate
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2 rounded-xl border border-blue-300 overflow-hidden">
              <div className="bg-[#EFF3FB] text-center py-2 text-sm font-semibold text-gray-700">
                Basic Features
              </div>

              {["Week", "Day", "Year", "Month", "Day name"].map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="accent-blue-600 scale-125"
                    onChange={(e) => toggleOption(item, e.target.checked)}
                  />
                  {item}
                </label>
              ))}
            </div>

            <div className="w-full sm:w-1/2 rounded-xl border border-blue-300 overflow-hidden">
              <div className="bg-[#EFF3FB] text-center py-2 text-sm font-semibold text-gray-700">
                Advance Features
              </div>

              {[
                "Week Number",
                "Quarter",
                "Days since start",
                "is Weekend",
                "Day of week",
              ].map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="accent-blue-600 scale-125"
                    onChange={(e) => toggleOption(item, e.target.checked)}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setalldata((prev) => ({
              ...prev,
              features_selected: OptionsSelected,
            }));
            SendData();
            seticon((prev) => (prev === 1 ? 2 : 1));
          }}
          className="
          w-full sm:w-auto
          lg:absolute lg:bottom-3 lg:right-115
          mt-6 lg:mt-0
          flex items-center gap-3
          rounded-2xl bg-blue-600 
          px-5 py-3 text-white
          shadow-lg shadow-blue-500/30
          hover:bg-blue-700 hover:shadow-blue-500/40
          active:scale-95 transition-all
          justify-center
        "
        >
          {icon === 1 && <CiSaveDown1 size={26} />}
          {icon === 2 && <Loader />}

          <div className="flex flex-col leading-tight">
            <span className="text-base font-semibold">Download CSV</span>
            <span className="text-xs text-blue-100">Save the output file</span>
          </div>
        </button>
      </div>
    </div>
  );

};

export default MainPart;
