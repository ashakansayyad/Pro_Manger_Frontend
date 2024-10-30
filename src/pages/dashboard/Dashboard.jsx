import React from "react";
import styles from "./Dashboard.module.css";
import Sidebar from "../sidebar/Sidebar";
import Homebar from "../homebar/Homebar";
import { useState } from "react";
import { TaskProvider } from "../../context/TaskContext";
import { DeleteModalProvider } from "../../context/DeleteModal";
import { TaskIdProvider } from "../../context/TaskIdContext";
import { FilterProvider } from "../../context/FilterContext";
import Analytics from "../analytics/Analytics";
import Setting from "../setting/Setting";
function Dashboard() {
  const [selectedPage, setSelectedPage] = useState("Homebar");
  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard_sidebar}>
        <Sidebar selectedPage={selectedPage} onPageSelect={setSelectedPage} />
      </div>
      <div className={styles.dashboard_homebar}>
        <TaskProvider>
          <DeleteModalProvider>
            <TaskIdProvider>
              <FilterProvider>
                {selectedPage === "Homebar" && <Homebar />}
                {selectedPage === "Analytics" && <Analytics />}
                {selectedPage === "Setting" && <Setting />}
              </FilterProvider>
            </TaskIdProvider>
          </DeleteModalProvider>
        </TaskProvider>
      </div>
    </div>
  );
}

export default Dashboard;
