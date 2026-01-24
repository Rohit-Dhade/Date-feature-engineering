import React from "react";
import { createContext ,useState } from "react";
export const ProductData = createContext();

const DataContext = ({children}) => {
const [alldata, setalldata] = useState([])
  return (
    <ProductData.Provider value={{alldata, setalldata}}>
      {children}
    </ProductData.Provider>
  );
};

export default DataContext;
