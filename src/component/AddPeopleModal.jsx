import React, { useContext, useState } from "react";
import styles from "./CSS/AddPeopleModal.module.css";
import { toast } from "react-toastify";
import { ModalContext } from "../context/Modal";
import { assignBoardToUser } from "../apis/task";

function AddPeopleModal() {
  const { addPeopleModal, toggleAddPeopleModal } = useContext(ModalContext);
  const [email, setEmail] = useState("");
  const [isAssigned, setIsAssigned] = useState(false);

  const handleAssignBoard = async () => {
    if (!email) {
      toast.error("Please enter an email", { theme: "colored" });
      return;
    }
    try {
      const response = await assignBoardToUser(email);
      toast.success(response.message, { theme: "colored" });
      setIsAssigned(true); // Update state to show  assigned message
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message, { theme: "colored" });
      } else {
        toast.error("Something went wrong", { theme: "colored" });
      }
    }
  };

  const handleCloseModal = () => {
    setIsAssigned(false);
    setEmail("");
    toggleAddPeopleModal();
  };

  return (
    <>
      {addPeopleModal && (
        <div className={styles.container}>
          <div className={styles.overlay} onClick={handleCloseModal}></div>
          <div className={styles.modalContent}>
            {!isAssigned ? (
              <>
                <p>Add people to the board</p>
                <div className={styles.email_input}>
                  <input
                    type="email"
                    placeholder="Enter the email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className={styles.modalContent_footer_two_btn}>
                  <button id={styles.delete} onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button id={styles.cancle} onClick={handleAssignBoard}>
                    Add Email
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className={styles.after_success}>
                  <p>{email} added to board</p>
                  <button id={styles.goitBtn} onClick={handleCloseModal}>
                    Okay, got it!
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default AddPeopleModal;
