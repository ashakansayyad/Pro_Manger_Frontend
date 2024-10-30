import React from "react";
import styles from "./CSS/LogoutModal.module.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../context/Modal";
import { toast } from "react-toastify";

function LogoutModal() {
  const { logoutModal, toggleLogoutModal } = useContext(ModalContext);
  const navigate = useNavigate();
  
  //logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("You logout successfully!", { theme: "colored" });
    toggleLogoutModal();
    navigate("/login");
  };
  return (
    <>
      {logoutModal && (
        <div className={styles.container}>
          <div className={styles.overlay} onClick={toggleLogoutModal}></div>
          <div className={styles.modalContent}>
            <p>Are you sure you want to Logout?</p>
            <div className={styles.modalContent_footer_two_btn}>
              <button id={styles.delete} onClick={handleLogout}>
                Yes, Logout
              </button>
              <button id={styles.cancle} onClick={toggleLogoutModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LogoutModal;
