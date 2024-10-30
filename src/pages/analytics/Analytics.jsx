import React, { useEffect, useState } from "react";
import styles from "./Analytics.module.css";
import analytics_dot from "../../assets/analytics_dot.svg";
import { getAnalyticsData } from "../../apis/task";

function Analytics() {
  const [analyticsData, setAnalyticsData] = useState({
    statusCounts: {
      BACKLOG: 0,
      "TO-DO": 0,
      PROGRESS: 0,
      DONE: 0,
    },
    priorityCounts: {
      "MODERATE PRIORITY": 0,
      "HIGH PRIORITY": 0,
      "LOW PRIORITY": 0,
    },
    dueDateCount: 0,
  });

  //get analytics data for logged in user
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await getAnalyticsData();
        setAnalyticsData(res.data);
      } catch (err) {
        console.error("Failed to load analytics data", err);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className={styles.analytics}>
      <div className={styles.analytics_header}>Analytics</div>
      <div className={styles.analytics_main}>
        <div className={styles.analytics_main_left}>
          <div>
            <span>
              <img src={analytics_dot} alt="dot" /> Backlog Tasks
            </span>
            <p>{analyticsData.statusCounts["BACKLOG"] || 0}</p>
          </div>
          <div>
            <span>
              <img src={analytics_dot} alt="dot" /> To-do Tasks
            </span>
            <p>{analyticsData.statusCounts["TO-DO"] || 0}</p>
          </div>
          <div>
            <span>
              <img src={analytics_dot} alt="dot" /> In-Progress Tasks
            </span>
            <p>{analyticsData.statusCounts["PROGRESS"] || 0}</p>
          </div>
          <div>
            <span>
              <img src={analytics_dot} alt="dot" />
              Completed Tasks
            </span>
            <p>{analyticsData.statusCounts["DONE"] || 0}</p>
          </div>
        </div>
        <div className={styles.analytics_main_right}>
          <div>
            <span>
              <img src={analytics_dot} alt="dot" /> Low Priority
            </span>
            <p>{analyticsData.priorityCounts["LOW PRIORITY"] || 0}</p>
          </div>
          <div>
            <span>
              <img src={analytics_dot} alt="dot" /> Moderate Priority
            </span>
            <p>{analyticsData.priorityCounts["MODERATE PRIORITY"] || 0}</p>
          </div>
          <div>
            <span>
              <img src={analytics_dot} alt="dot" />
              High Priority
            </span>
            <p>{analyticsData.priorityCounts["HIGH PRIORITY"] || 0}</p>
          </div>
          <div>
            <span>
              <img src={analytics_dot} alt="dot" />
              Due Date Tasks
            </span>
            <p>{analyticsData.dueDateCount || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
