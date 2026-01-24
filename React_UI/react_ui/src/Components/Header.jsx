import React from "react";

const Header = () => {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h1 className="font-extrabold text-4xl tracking-tight text-gray-900">
        Date Feature Generator
      </h1>
      <p className="max-w-xl text-base text-gray-500 leading-relaxed">
        Automatically generate meaningful date-based features from your CSV
        files for analysis and machine learning.
      </p>
    </div>
  );
};

export default Header;
