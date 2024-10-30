import React from "react";
import styles from "./Sidebar.module.css";
import pro_manager_icon from "../../assets/pro_manage.svg";
import board_icon from "../../assets/board_logo.svg";
import analytics_icon from "../../assets/analytics_logo.svg";
import setting_icon from "../../assets/setting_logo.svg";
import logout_icon from "../../assets/Logout.svg";
import { useContext } from "react";
import { ModalContext } from "../../context/Modal";
import LogoutModal from "../../component/LogoutModal";
function Sidebar({ selectedPage, onPageSelect }) {
  const { logoutModal, toggleLogoutModal } = useContext(ModalContext);

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_header}>
        <img src={pro_manager_icon} alt="" />
        <h3>Pro Manage</h3>
      </div>
      <div className={styles.sidebar_main}>
        <div className={styles.sidebar_main_group}>
          <div
            className={`${styles.sidebar_main_group_item} ${
              selectedPage === "Homebar" ? styles.active : ""
            }`}
            onClick={() => onPageSelect("Homebar")}
          >
            <img src={board_icon} alt="icon" />
            <p>Board</p>
          </div>
          <div
            className={`${styles.sidebar_main_group_analytics} ${
              selectedPage === "Analytics" ? styles.active : ""
            }`}
            onClick={() => onPageSelect("Analytics")}
          >
            <img src={analytics_icon} alt="icon" />
            <p>Analytics</p>
          </div>
          <div
            className={`${styles.sidebar_main_group_setting} ${
              selectedPage === "Setting" ? styles.active : ""
            }`}
            onClick={() => onPageSelect("Setting")}
          >
            <img src={setting_icon} alt="icon" />
            <p>Settings</p>
          </div>
        </div>
        <div className={styles.sidebar_main_group_logout}>
          <img src={logout_icon} alt="icon" />
          <button onClick={toggleLogoutModal}>Log out</button>
        </div>
      </div>
      {logoutModal && <LogoutModal />}
    </div>
  );
}

export default Sidebar;
