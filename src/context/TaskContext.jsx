import { createContext, useState } from "react";
import { moveTask } from "../apis/task";
import { toast } from "react-toastify";

export const TaskContext = createContext();
export const TaskProvider = ({ children }) => {
  const [todoCollapsed, setTodoCollapsed] = useState(false);
  const [backlogCollapsed, setBacklogCollapsed] = useState(false);
  const [progressCollapsed, setProgressCollapsed] = useState(false);
  const [doneCollapsed, setDoneCollapsed] = useState(false);
  const [isTaskMove, setIsTaskMove] = useState(false);

  //collapse all checklist items
  const toggleSectionCollapse = (section) => {
    switch (section) {
      case "TO-DO":
        setTodoCollapsed(!todoCollapsed);
        break;
      case "BACKLOG":
        setBacklogCollapsed(!backlogCollapsed);
        break;
      case "PROGRESS":
        setProgressCollapsed(!progressCollapsed);
        break;
      case "DONE":
        setDoneCollapsed(!doneCollapsed);
        break;
      default:
        break;
    }
  };
  // Function to move task to a new status
  const moveTaskToStatus = async (taskId, newStatus) => {
    try {
      const res = await moveTask(taskId, newStatus);
      if (res.status === 200) {
        toast.success(`Task moved to ${newStatus} successfully`, {
          theme: "colored",
        });
        setIsTaskMove(!isTaskMove);
      } else {
        console.error("Error moving task");
      }
    } catch (err) {
      if ((err.response && err.response.status === 400) || 401) {
        toast.error(err.response.data.message, { theme: "colored" });
      } else {
        toast.error("Something wents wrong!", { theme: "colored" });
      }
    }
  };

  return (
    <TaskContext.Provider
      value={{
        moveTaskToStatus,
        todoCollapsed,
        backlogCollapsed,
        progressCollapsed,
        doneCollapsed,
        toggleSectionCollapse,
        isTaskMove,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
