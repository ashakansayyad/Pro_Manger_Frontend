import React, { useContext, useState, useEffect } from "react";
import { ModalContext } from "../context/Modal";
import { getAllUsers } from "../apis/user";
import { addTask, getTaskById, updateTask } from "../apis/task";
import delete_icon from "../assets/Delete.svg";
import high_priority_icon from "../assets/high_priority.svg";
import mid_priority_icon from "../assets/mid_priority.svg";
import low_priority_icon from "../assets/low_priority.svg";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import "./CSS/custom-datepicker.css";
import styles from "./CSS/CreateTaskModal.module.css";
import { TaskIdContext } from "../context/TaskIdContext";

function CreateTaskModal() {
  const { selectedTaskId, setSelectedTaskId } = useContext(TaskIdContext); // Get task ID for editing
  const { addTaskModal, toggleModal } = useContext(ModalContext);
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
    priority: "",
    assignTo: null,
    assignedEmail: null,
    checklist: [],
    dueDate: null,
    users: [],
  });

  const isEdit = !!selectedTaskId;

  // Fetch task data for editing and pre-fill form
  useEffect(() => {
    if (selectedTaskId) {
      const fetchTask = async () => {
        try {
          const taskRes = await getTaskById(selectedTaskId); // Fetch task by ID
          if (taskRes.status === 200) {
            fillTaskData(taskRes.data); // Pre-fill task data
          }
          // Fetch all users email to assign tasks

          const userRes = await getAllUsers();
          if (userRes && userRes.data) {
            setTaskData((pre) => ({ ...pre, users: userRes.data }));
          }
        } catch (error) {
          console.error("Failed to fetch task data:", error);
        }
      };
      fetchTask();
    }
  }, [selectedTaskId]);

  // Fill task data for editing
  const fillTaskData = (data) => {
    const {
      title,
      priority,
      assignTo,
      assignedEmail,
      checklist,
      dueDate,
      users,
    } = data;
    setTaskData({
      title,
      priority,
      assignTo,
      assignedEmail,
      checklist: checklist || [],
      dueDate: dueDate ? new Date(dueDate) : null,
      users: users || [],
    });
  };

  const handleChecklistChange = (index, checked) => {
    const updatedChecklist = taskData.checklist.map((item, idx) =>
      idx === index ? { ...item, isCompleted: checked } : item
    );

    setTaskData((pre) => ({
      ...pre,
      checklist: updatedChecklist,
    }));
  };

  const handleDescriptionChange = (index, description) => {
    const updatedChecklist = taskData.checklist.map((item, idx) =>
      idx === index ? { ...item, description } : item
    );
    setTaskData((pre) => ({
      ...pre,
      checklist: updatedChecklist,
    }));
    if (description) {
      setErrors((pre) => ({ ...pre, checklist: false }));
    }
  };

  const handleDeleteChecklistItem = (index) => {
    const newChecklist = [...taskData.checklist];
    newChecklist.splice(index, 1);
    setTaskData({ ...taskData, checklist: newChecklist });
  };

  const addNewChecklistItem = () => {
    const newChecklistItem = {
      description: "",
      isComplete: false,
    };
    setTaskData((prev) => ({
      ...prev,
      checklist: [...prev.checklist, newChecklistItem],
    }));

    setErrors((prev) => ({ ...prev, checklist: false }));
  };

  const addTaskValidation = () => {
    const newError = {};
    // title
    if (!taskData.title.trim()) {
      newError.title = "Title is required";
    }

    //priority
    if (!taskData.priority) {
      newError.priority = "Priority is required";
    }
    // checklist
    if (taskData.checklist.length === 0) {
      newError.checklist = "At least one checklist item is required";
    } else {
      let isEmptyDescription = false;
      for (let i = 0; i < taskData.checklist.length; i++) {
        if (taskData.checklist[i].description.trim()) {
          isEmptyDescription = true;
          break;
        }
        if (!isEmptyDescription) {
          newError.checklist = "Checklist description is required ";
        }
      }
    }

    return newError;
  };

  // save task function
  const handleTaskSubmitData = async () => {
    const taskErrors = addTaskValidation();
    if (Object.keys(taskErrors).length > 0) {
      setErrors(taskErrors);
      return;
    }
    try {
      const res = isEdit
        ? await updateTask(selectedTaskId, {
            ...taskData,
            assignTo: taskData.assignTo,
            assignedEmail: taskData.assignedEmail,
          })
        : await addTask({
            ...taskData,
            assignTo: taskData.assignTo,
            assignedEmail: taskData.assignedEmail,
          });

      if (res.status === 201) {
        toggleModal();
        toast.success("Task created successfully!", { theme: "colored" });
        setSelectedTaskId("");
      } else if (res.status === 200) {
        toggleModal();
        toast.success("Task updated successfully!", { theme: "colored" });
        setSelectedTaskId("");
      }
    } catch (err) {
      if ((err.response && err.response.status === 400) || 401) {
        toast.error(err.response.data.message, { theme: "colored" });
      } else {
        toast.error("Something went wrong!", { theme: "colored" });
      }
    }
  };

  const handlePriorityChange = (priority) => {
    setTaskData((pre) => ({ ...pre, priority }));
    if (priority) {
      setErrors((pre) => ({ ...pre, priority: false }));
    }
  };

  const addClass = (priority) => {
    return taskData.priority === priority
      ? styles.selectedPriority
      : styles.priority;
  };

  const handleDateChange = (date) => {
    setTaskData((pre) => ({ ...pre, dueDate: date }));
  };
  const handleAssignUser = (id, email) => {
    setTaskData((pre) => ({ ...pre, assignTo: id, assignedEmail: email }));
    toggleDropdown();
  };
  const getChecklistProgress = () => {
    const totalChecklist = taskData.checklist.length;
    const completedList = taskData.checklist.filter(
      (item) => item.isCompleted
    ).length;
    return { totalChecklist, completedList };
  };
  const { totalChecklist, completedList } = getChecklistProgress();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const handleCancle = () => {
    setSelectedTaskId("");
    toggleModal();
  };

  return (
    <>
      {addTaskModal && (
        <div className={styles.container}>
          <div onClick={handleCancle} className={styles.overlay}></div>
          <div className={styles.modalContent}>
            <div className={styles.modalContent_addtasktitle_conatiner}>
              <span>
                Title <p>*</p>
              </span>
              <input
                type="text"
                value={taskData.title || ""}
                placeholder="Enter Task Title"
                onChange={(e) => {
                  setTaskData({ ...taskData, title: e.target.value });
                  if (e.target.value.length > 0) {
                    setErrors((pre) => ({ ...pre, title: false }));
                  }
                }}
              />
              {errors.title && <p className={styles.error}>{errors.title}</p>}
            </div>
            <div className={styles.modalContent_select_priority_conatiner}>
              <span>
                Select Priority <p>*</p>
              </span>
              <div
                className={addClass("HIGH PRIORITY")}
                onClick={() => handlePriorityChange("HIGH PRIORITY")}
              >
                <img src={high_priority_icon} alt="" />
                HIGH PRIORITY
              </div>
              <div
                className={addClass("MODERATE PRIORITY")}
                onClick={() => handlePriorityChange("MODERATE PRIORITY")}
              >
                <img src={mid_priority_icon} alt="" /> MODERATE PRIORITY
              </div>
              <div
                className={addClass("LOW PRIORITY")}
                onClick={() => handlePriorityChange("LOW PRIORITY")}
              >
                <img src={low_priority_icon} alt="" /> LOW PRIORITY
              </div>
            </div>
            {errors.priority && (
              <p id={styles.priority_error} className={styles.error}>
                {errors.priority}
              </p>
            )}
            <div className={styles.modalContent_assignto_conatiner}>
              <p>Assign to </p>
              <div className={styles.main_assign_div}>
                <div
                  className={styles.modalContent_custom_dropdown}
                  onClick={toggleDropdown}
                >
                  {taskData.assignTo ? (
                    <div>
                      {
                        taskData.users.find(
                          (user) => user._id === taskData.assignTo
                        )?.email
                      }
                    </div>
                  ) : (
                    <div>Add an assignee</div>
                  )}
                </div>
                {isOpen && (
                  <ul className={`styles.dropdownList ${isOpen ? "show" : ""}`}>
                    {taskData.users.map((user) => (
                      <li key={user._id} className={styles.dropdownItem}>
                        <div className={styles.dropdownItem_user_details}>
                          <div className={styles.user_detail_initial}>
                            {user.email.slice(0, 2).toUpperCase()}
                          </div>
                          <div>{user.email}</div>
                        </div>
                        <button
                          onClick={() => handleAssignUser(user._id, user.email)}
                        >
                          Assign
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className={styles.modalContent_checklist_conatiner}>
              <span>
                Checklist ({completedList}/{totalChecklist})<p>*</p>
              </span>

              <div className={styles.modalContent_checklist_lists}>
                {taskData.checklist.map((item, index) => (
                  <div
                    key={index}
                    className={styles.modalContent_checklist_singlelist}
                  >
                    <input
                      type="checkbox"
                      id={styles.checkbox}
                      style={{ cursor: "pointer" }}
                      checked={item.isCompleted}
                      onChange={(e) =>
                        handleChecklistChange(index, e.target.checked)
                      }
                    />

                    <input
                      id={styles.description}
                      type="text"
                      value={item.description || ""}
                      placeholder="Type..."
                      onChange={(e) =>
                        handleDescriptionChange(index, e.target.value)
                      }
                    />
                    <img
                      src={delete_icon}
                      onClick={() => handleDeleteChecklistItem(index)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                ))}
              </div>
              {errors.checklist && (
                <p className={styles.error}>{errors.checklist}</p>
              )}
              <button onClick={addNewChecklistItem}>+ Add New</button>
            </div>
            <div className={styles.modalContent_footer_btn}>
              <div className={styles.modalContent_duedate_container}>
                <DatePicker
                  selected={taskData.dueDate}
                  onChange={handleDateChange}
                  className={styles.datepicker}
                  placeholderText="Select Due Date"
                />
              </div>

              <div className={styles.modalContent_footer_two_btn}>
                <button id={styles.canclebtn} onClick={handleCancle}>
                  Cancle
                </button>
                <button id={styles.savebtn} onClick={handleTaskSubmitData}>
                  {isEdit ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateTaskModal;
