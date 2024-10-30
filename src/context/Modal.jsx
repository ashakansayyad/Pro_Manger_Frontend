import { useState, createContext } from "react";

export const ModalContext = createContext();

export const Modal = ({ children }) => {

  //for task creation
  const [addTaskModal, setAddTaskModal] = useState(false);
  const toggleModal = () => {
    setAddTaskModal(!addTaskModal);
  };

//for logout modal  
  const [logoutModal, setLogoutModal] = useState(false);
  const toggleLogoutModal = () => {
    setLogoutModal(!logoutModal);
  };

  //for add people to board, modal
  const [addPeopleModal, setAddPeopleModal] = useState(false);
  const toggleAddPeopleModal = () => {
    setAddPeopleModal(!addPeopleModal);
  };

  return (
    <ModalContext.Provider
      value={{
        addTaskModal,
        setAddTaskModal,
        toggleModal,
        logoutModal,
        toggleLogoutModal,
        addPeopleModal,
        toggleAddPeopleModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
