import React, { createContext, useState } from "react";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {

  // filter context
  const [dateFilter, setDateFilter] = useState("week");

  return (
    <FilterContext.Provider value={{ dateFilter, setDateFilter }}>
      {children}
    </FilterContext.Provider>
  );
};
