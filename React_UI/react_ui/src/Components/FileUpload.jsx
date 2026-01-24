import React, { useEffect } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [filename, setfilename] = useState("Drag & drop your CSV file here");
  const [file, setfile] = useState(null);

  useEffect(() => {
    if (!file) return;

    const reader = async () => {
      const formdata = new FormData();
      formdata.append("file", file);
      try {
        const response = await axios.post(
          "http://localhost:8000/upload/",
          formdata,
        );
        const columns = JSON.parse(response.headers["columns"])
        // console.log(columns[0]);
      } catch (err) {
        console.log(err);
      }
    };
    reader();
  }, [file]);

  return (
    <div className="bg-white flex flex-col gap-4 mt-4 p-6 border border-gray-200 rounded-xl shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-blue-600 text-2xl font-bold">1.</span>
        <h2 className="text-lg font-semibold text-gray-900">Upload CSV file</h2>
      </div>

      <label
        className="group cursor-pointer bg-[#F4F7FF] p-8 border-2 border-dashed border-blue-300 rounded-xl 
                    hover:bg-blue-50 hover:border-blue-400 transition"
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="text-blue-500 text-4xl">
            <IoMdCloudUpload />
          </div>

          <p className="text-sm font-medium text-gray-700">{filename}</p>

          <p className="text-xs text-gray-500">
            or <span className="text-blue-600 underline">browse</span> from your
            computer
          </p>
        </div>

        <input
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => {
            (setfilename(e.target.files[0].name), setfile(e.target.files[0]));
          }}
        />
      </label>
    </div>
  );
};

export default FileUpload;
