import React from "react";
import { DeleteModalContext } from "../context/DeleteModal";
import styles from "./CSS/DeleteTaskModal.module.css";
import { useContext } from "react";
import { deleteTask } from "../apis/task";
import { toast } from "react-toastify";
import { TaskIdContext } from "../context/TaskIdContext";
function DeleteTaskModal() {
  const { selectedTaskId ,setSelectedTaskId} = useContext(TaskIdContext);
  const { deleteTaskModal, toggleDeleteModal } = useContext(DeleteModalContext);

  const handleDelete = async () => {
    try {
      const res = await deleteTask(selectedTaskId);
      if (res.status === 200) {
        toast.success("Task deleted successfully!", { theme: "colored" });
        toggleDeleteModal();
        setSelectedTaskId("");
      }
    } catch (err) {
      if(err.response && err.response.status === 400 || 401){
        toast.error(err.response.data.message);
      }else{
        toast.error("Something went wrong!");
      }
    }
  };
const handleCancle = ()=>{
  setSelectedTaskId("");
  toggleDeleteModal();
}
  return (
    <>
      {deleteTaskModal && (
        <div className={styles.container}>
          <div className={styles.overlay} onClick={handleCancle}></div>
          <div className={styles.modalContent}>
            <p>Are you sure you want to Delete?</p>
            <div className={styles.modalContent_footer_two_btn}>
              <button id={styles.delete} onClick={handleDelete}>
                Yes, Delete
              </button>
              <button id={styles.cancle} onClick={handleCancle}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteTaskModal;
