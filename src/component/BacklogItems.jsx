import React, { useState, useEffect, useContext } from "react";
import styles from "./CSS/BacklogItems.module.css";
import { ItemList } from "./ItemList";
import { getTasksByStatus, getFilterTask } from "../apis/task";
import CreateTaskModal from "./CreateTaskModal";
import { TaskIdContext } from "../context/TaskIdContext";
import { ModalContext } from "../context/Modal";
import { DeleteModalContext } from "../context/DeleteModal";
import DeleteTaskModal from "./DeleteTaskModal";
import { FilterContext } from "../context/FilterContext";
import { TaskContext } from "../context/TaskContext";

const BacklogItems = () => {
  const [task, setTask] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setSelectedTaskId } = useContext(TaskIdContext);
  const { addTaskModal, setAddTaskModal } = useContext(ModalContext);
  const { deleteTaskModal, setDeleteTaskModal } =
    useContext(DeleteModalContext);
  const { dateFilter } = useContext(FilterContext);
  const { isTaskMove } = useContext(TaskContext);

  const handleEditClick = (taskId) => {
    setSelectedTaskId(taskId);
    setAddTaskModal(true);
  };
  const handleDeleteClick = (taskId) => {
    setSelectedTaskId(taskId);
    setDeleteTaskModal(true);
  };

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const statusRes = await getTasksByStatus("BACKLOG");
      if (statusRes.status !== 200) {
        console.error("Error fetching tasks by status:", statusRes);
        return;
      }
      let statusTasks = statusRes.data; // Tasks filtered by status

      if (dateFilter) {
        const dateRes = await getFilterTask(dateFilter);
        if (dateRes.status !== 200) {
          console.error("Error fetching tasks by date filter:", dateRes);
          return;
        }
        let dateFilteredTasks = dateRes.data; // Tasks filtered by date
        const combinedTasks = statusTasks.filter((task) =>
          dateFilteredTasks.some(
            (filteredTask) => filteredTask._id === task._id
          )
        );
        setTask(combinedTasks);
      } else {
        setTask(statusTasks);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTask([]);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, [dateFilter, deleteTaskModal, addTaskModal, isTaskMove]);

  if (isLoading) {
    return <p className={styles.loading}>Loading...</p>;
  }
  return (
    <>
      {deleteTaskModal && <DeleteTaskModal />}
      {addTaskModal && <CreateTaskModal />}
      {task.length > 0 ? (
        <div className={styles.backlogitems}>
          {task.map((item) => (
            <ItemList
              key={item._id}
              title={item.title}
              id={item._id}
              status={item.status}
              priority={item.priority}
              checklist={item.checklist}
              dueDate={item.dueDate}
              assignedEmail={item?.assignedEmail}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          ))}
        </div>
      ) : (
        <p></p>
      )}
    </>
  );
};

export default BacklogItems;
