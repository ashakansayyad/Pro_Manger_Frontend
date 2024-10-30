import { useState, createContext, useContext } from "react";

export const DeleteModalContext = createContext();
export const DeleteModalProvider = ({ children }) => {
  //for delete task modal
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);

  const toggleDeleteModal = () => {
    setDeleteTaskModal(!deleteTaskModal);
  };

  return (
    <DeleteModalContext.Provider
      value={{ deleteTaskModal, setDeleteTaskModal, toggleDeleteModal }}
    >
      {children}
    </DeleteModalContext.Provider>
  );
};
