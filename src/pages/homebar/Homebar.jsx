import React, { useState,useContext,useEffect } from "react";
import add_people_icon from "../../assets/add_people_logo.svg";
import styles from "./Homebar.module.css";
import collaps_icon from "../../assets/collapse_icon.svg";
import add_task_icon from "../../assets/add_task_icon.svg";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { ModalContext } from "../../context/Modal";
import filter_arrow from "../../assets/filter_options_arrow.svg";
import { CurrentDate } from "../../utils/date";
import CreateTaskModal from "../../component/CreateTaskModal";
import TodoItems from "../../component/TodoItems";
import BacklogItems from "../../component/BacklogItems";
import InprogressItems from "../../component/InprogressItems";
import DoneItemes from "../../component/DoneItems";
import { TaskContext } from "../../context/TaskContext";
import { FilterContext } from "../../context/FilterContext";
import AddPeopleModal from "../../component/AddPeopleModal";

function Homebar() {
  const { loggedUserData, isLoading } = useContext(UserContext);
  const isLoggedIn = localStorage.getItem("token");
  const { addPeopleModal, toggleAddPeopleModal } = useContext(ModalContext);
  const { addTaskModal, setAddTaskModal } = useContext(ModalContext);
  const { toggleSectionCollapse } = useContext(TaskContext);
  const { setDateFilter } = useContext(FilterContext);
  const [filter, setFilter] = useState("This Week");
  const [toggleFilter, setToggleFilteer] = useState(false);
  const navigate = useNavigate();

  const handleFilterChange = (filter, disFilter) => {
    setDateFilter(filter);
    setFilter(disFilter);
    toggleFilterOptions();
  };
  const toggleFilterOptions = () => {
    setToggleFilteer(!toggleFilter);
  };
useEffect(()=>{
  if (!isLoggedIn) {
    navigate("/login");
  }
},[]);

  const toggleModal = () => {
    setAddTaskModal(!addTaskModal);
  };
  return (
    <div className={styles.homebar}>
      <header className={styles.homebar_header}>
        <div className={styles.homebar_header_title}>
          <h2>
            Welcome!
            <span className={styles.userName}>

             {isLoading ? (
              <p>Loading..</p>
            ) : isLoggedIn ? (
              loggedUserData?.name.charAt(0).toUpperCase() + loggedUserData?.name.slice(1)
            ) : null}
            </span>
          </h2>
          <p id={styles.currentdate}>{CurrentDate()}</p>
        </div>
        <div className={styles.homebar_header_title_Board}>
          <div className={styles.homebar_header_title_Board_container}>
            <h2>Board</h2>
            <span>
              <img src={add_people_icon} alt="img" />
              <p style={{ cursor: "pointer" }} onClick={toggleAddPeopleModal}>
                Add People
              </p>
            </span>
          </div>
          <div className={styles.homebar_header_title_Board_options}>
            <p onClick={toggleFilterOptions} id={styles.title}>
              {filter} <img src={filter_arrow} alt="img" />{" "}
            </p>
            <div
              style={{ display: toggleFilter ? "block" : "none" }}
              className={styles.homebar_header_title_Board_options_filters}
            >
              <p onClick={() => handleFilterChange("today", "Today")}>Today</p>
              <p onClick={() => handleFilterChange("week", "This Week")}>
                This Week
              </p>
              <p onClick={() => handleFilterChange("month", "This Month")}>
                This Month
              </p>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className={styles.main_div_backlog}>
          <div className={styles.main_div_backlog_header}>
            <p>Backlog</p>
            <img
              onClick={() => toggleSectionCollapse("BACKLOG")}
              src={collaps_icon}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className={styles.main_div_backlog_main}>
            <BacklogItems />
          </div>
        </div>
        <div className={styles.main_div_todo}>
          <div className={styles.main_div_todo_header}>
            <p>To do</p>
            <span>
              <img
                onClick={() => toggleModal()}
                src={add_task_icon}
                style={{ cursor: "pointer" }}
              />
              <img
                onClick={() => toggleSectionCollapse("TO-DO")}
                src={collaps_icon}
                style={{ cursor: "pointer" }}
              />
            </span>
          </div>
          <div className={styles.main_div_todo_main}>
            <TodoItems />
          </div>
        </div>
        <div className={styles.main_div_inprogress}>
          <div className={styles.main_div_inprogress_header}>
            <p>In progress</p>
            <img
              onClick={() => toggleSectionCollapse("PROGRESS")}
              src={collaps_icon}
              alt="img"
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className={styles.main_div_inprogress_main}>
            <InprogressItems />
          </div>
        </div>
        <div className={styles.main_div_done}>
          <div className={styles.main_div_done_header}>
            <p>Done</p>
            <img
              onClick={() => toggleSectionCollapse("DONE")}
              src={collaps_icon}
              alt="img"
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className={styles.main_div_done_main}>
            <DoneItemes />
          </div>
        </div>
      </main>
      {addTaskModal && <CreateTaskModal />}
      {addPeopleModal && <AddPeopleModal />}
    </div>
  );
}

export default Homebar;
