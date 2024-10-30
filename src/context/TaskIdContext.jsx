import { useState, createContext } from "react";
export const TaskIdContext = createContext();

export const TaskIdProvider = ({ children }) => {
  const [selectedTaskId, setSelectedTaskId] = useState(""); //task id for specefic operations

  return (
    <TaskIdContext.Provider value={{ selectedTaskId, setSelectedTaskId }}>
      {children}
    </TaskIdContext.Provider>
  );
};
