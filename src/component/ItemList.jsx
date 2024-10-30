import React from "react";
import styles from "./CSS/ItemList.module.css";
import { TaskContext } from "../context/TaskContext";
import options_icon from "../assets/options_icon.svg";
import collaps_up_arrow_icon from "../assets/collaps_up_arrow.svg";
import collpas_down_arrow_icon from "../assets/collpas_down_arrow.svg";
import high_priority_icon from "../assets/high_priority.svg";
import mid_priority_icon from "../assets/mid_priority.svg";
import low_priority_icon from "../assets/low_priority.svg";
import { useState, useContext, useEffect } from "react";
import { formattedDate, isPassDueDate } from "../utils/date";
import { generateShareLink } from "../apis/task";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CSS/ToastStyles.css";

export const ItemList = ({
  title,
  id,
  status,
  checklist,
  dueDate,
  priority,
  assignedEmail,
  onEditClick,
  onDeleteClick,
}) => {
  const {
    moveTaskToStatus,
    todoCollapsed,
    backlogCollapsed,
    progressCollapsed,
    doneCollapsed,
  } = useContext(TaskContext);

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isOptions, setIsOptions] = useState(false);

  const initials = assignedEmail ? assignedEmail.slice(0, 2).toUpperCase() : "";
  const getChecklistProgress = () => {
    const totalChecklist = checklist.length;
    const completedList = checklist.filter((item) => item.isCompleted).length;
    return { totalChecklist, completedList };
  };

  const overdue = dueDate && isPassDueDate(dueDate);

  const toggleCollaps = () => {
    setIsCollapsed(!isCollapsed);
  };
  const toggleOptions = () => {
    setIsOptions(!isOptions);
  };
  const handleDeleteClick = () => {
    toggleOptions();
    onDeleteClick(id);
  };
  const handleEditClick = () => {
    toggleOptions();
    onEditClick(id);
  };
  //share link toast
  const showCopyToast = () => {
    toast("Link Copied", {
      className: "custom-toast",
      bodyClassName: "custom-toast-body",
      autoClose: 2000,
      closeButton: false,
      hideProgressBar: true,
      position: "top-right",
    });
  };

  const handleShareClick = async (taskId) => {
    try {
      const res = await generateShareLink(taskId);
      if (res && res.data) {
        showCopyToast();
        <ToastContainer />;
        await navigator.clipboard.writeText(res.data);
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log("error: ", err);
    }
    toggleOptions();
  };

  const { totalChecklist, completedList } = getChecklistProgress();

  const isSectionCollapsed =
    status === "TO-DO"
      ? todoCollapsed
      : status === "BACKLOG"
      ? backlogCollapsed
      : status === "PROGRESS"
      ? progressCollapsed
      : status === "DONE"
      ? doneCollapsed
      : false;

  useEffect(() => {
    if (isSectionCollapsed) {
      setIsCollapsed(true);
    }
  }, [isSectionCollapsed]);
  return (
    <div className={styles.itemlist}>
      <div className={styles.itemlist_header}>
        <div className={styles.itemlist_header_left}>
          <img
            src={
              priority === "HIGH PRIORITY"
                ? high_priority_icon
                : priority === "MODERATE PRIORITY"
                ? mid_priority_icon
                : low_priority_icon
            }
            alt="img"
          />
          {priority}
          {initials && <p>{initials}</p>}
        </div>
        <img
          onClick={toggleOptions}
          style={{ cursor: "pointer" }}
          src={options_icon}
          alt="img"
        />
        <div
          className={`${styles.options_conatiner} ${
            isOptions ? styles.show : styles.hide
          }`}
        >
          <p onClick={handleEditClick} id={styles.edit}>
            Edit
          </p>
          <p onClick={() => handleShareClick(id)} id={styles.share}>
            Share
          </p>
          <p onClick={handleDeleteClick} id={styles.delete}>
            Delete
          </p>
        </div>
      </div>

      <div className={styles.itemlist_title} title={title}>
        <h3 className={styles.truncatedTitle}>{title}</h3>
      </div>
      <div className={styles.itemlist_checklist}>
        <div className={styles.itemlist_checklist_collaps}>
          <p>
            Checklist ({completedList}/{totalChecklist})
          </p>
          <span onClick={() => toggleCollaps()}>
            <img
              src={
                isCollapsed ? collpas_down_arrow_icon : collaps_up_arrow_icon
              }
              alt="img"
            />
          </span>
        </div>
        <div
          className={`${styles.checklist} ${
            !isCollapsed ? styles.checklist_visible : ""
          }`}
        >
          {checklist.map((list, index) => (
            <div
              key={index}
              className={styles.itemlist_checklist_collaps_list_conatiner}
            >
              <input type="checkbox" checked={list.isCompleted} readOnly />
              <p>{list.description}</p>
            </div>
          ))}
        </div>
        <div className={styles.itemlist_footer}>
          <div>
            {dueDate && (
              <div
                style={{
                  background:
                    status === "DONE"
                      ? "#63C05B"
                      : overdue
                      ? "#CF3636"
                      : priority === "HIGH PRIORITY"
                      ? "#CF3636"
                      : "#DBDBDB",
                  color:
                    status === "DONE" ||
                    (overdue && status !== "DONE") ||
                    priority === "HIGH PRIORITY"
                      ? "#FFFFFF"
                      : "#5A5A5A",
                }}
                className={styles.itemlist_footer_date}
              >
                {formattedDate(dueDate)}
              </div>
            )}
          </div>
          <div className={styles.itemlist_footer_btncontiner}>
            <button
              onClick={() => {
                if (status === "TO-DO") {
                  moveTaskToStatus(id, "BACKLOG");
                } else if (status === "BACKLOG") {
                  moveTaskToStatus(id, "PROGRESS");
                } else if (status === "PROGRESS") {
                  moveTaskToStatus(id, "BACKLOG");
                } else {
                  moveTaskToStatus(id, "BACKLOG");
                }
              }}
            >
              {status === "TO-DO"
                ? "BACKLOG"
                : status === "BACKLOG"
                ? "PROGRESS"
                : status === "PROGRESS"
                ? "BACKLOG"
                : "BACKLOG"}
            </button>

            <button
              onClick={() => {
                if (status === "TO-DO") {
                  moveTaskToStatus(id, "PROGRESS");
                } else if (status === "BACKLOG") {
                  moveTaskToStatus(id, "TO-DO");
                } else if (status === "PROGRESS") {
                  moveTaskToStatus(id, "TO-DO");
                } else {
                  moveTaskToStatus(id, "TO-DO");
                }
              }}
            >
              {status === "TO-DO"
                ? "PROGRESS"
                : status === "BACKLOG"
                ? "TO-DO"
                : status === "PROGRESS"
                ? "TO-DO"
                : "TO-DO"}
            </button>

            <button
              onClick={() => {
                if (status === "TO-DO") {
                  moveTaskToStatus(id, "DONE");
                } else if (status === "BACKLOG") {
                  moveTaskToStatus(id, "DONE");
                } else if (status === "PROGRESS") {
                  moveTaskToStatus(id, "DONE");
                } else {
                  moveTaskToStatus(id, "PROGRESS");
                }
              }}
            >
              {status === "TO-DO"
                ? "DONE"
                : status === "BACKLOG"
                ? "DONE"
                : status === "PROGRESS"
                ? "DONE"
                : "PROGRESS"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
