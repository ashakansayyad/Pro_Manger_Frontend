import React from "react";
import styles from "./ViewSharedTask.module.css";
import { getSharedTask } from "../../apis/task";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import pro_manager_icon from "../../assets/pro_manage.svg";
import high_priority_icon from "../../assets/high_priority.svg";
import mid_priority_icon from "../../assets/mid_priority.svg";
import low_priority_icon from "../../assets/low_priority.svg";
import { formattedDate } from "../../utils/date";

function ViewSharedTask() {
  const { sharedId } = useParams();
  const [task, setTask] = useState({ checklist: [] });

  useEffect(() => {
    const fetchSharedTask = async () => {
      try {
        const res = await getSharedTask(sharedId);
        if (res && res.data) {
          setTask(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch shared task:", err);
      }
    };
    fetchSharedTask();
  }, [sharedId]);

  const getChecklistProgress = () => {
    const totalChecklist = task.checklist.length;
    const completedList = task.checklist.filter(
      (item) => item.isCompleted
    ).length;
    return { totalChecklist, completedList };
  };
  const { totalChecklist, completedList } = getChecklistProgress();

  if (!task) {
    return <p>Loading...</p>;
  }
  return (
    <div className={styles.viewsharedtask}>
      <div className={styles.viewsharedtask_header}>
        <img src={pro_manager_icon} alt="icon" />
        <p>Pro Manage</p>
      </div>
      <div className={styles.viewsharedtask_main}>
        {task.title ? (
          <div className={styles.viewsharedtask_task_conainer}>
            <div className={styles.priority_Conatiner}>
              <img
                src={
                  task.priority === "HIGH PRIORITY"
                    ? high_priority_icon
                    : task.priority === "MODERATE PRIORITY"
                    ? mid_priority_icon
                    : low_priority_icon
                }
                alt="icon"
              />
              {task.priority}
            </div>
            <h3>{task.title}</h3>
            <div className={styles.checklist_conatiner}>
              <p>
                {" "}
                Checklist ({completedList}/{totalChecklist})
              </p>
              <div className={styles.checklist_list_conatiner}>
                {task.checklist.map((list, index) => (
                  <div key={index} className={styles.checklist_list_items}>
                    <input
                      type="checkbox"
                      checked={list.isCompleted}
                      readOnly
                    />
                    <p>{list.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {task.dueDate && (
              <div className={styles.viewsharedtask_duedate_container}>
                <p>Due Date</p>
                <button className={styles.dueDate}>
                  {formattedDate(task.dueDate)}
                </button>
              </div>
            )}
          </div>
        ) : (
          <h2>No Data Found</h2>
        )}
      </div>
    </div>
  );
}

export default ViewSharedTask;
