import axios from "axios";
import { addTokenToHeader } from "../utils/auth";

//create task
export const addTask = async (data) => {
  const headers = addTokenToHeader({ headers: {} });
  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/task`,
    data,
    {
      headers,
      "Content-Type": "application/json",
    }
  );
  return res;
};

//get all tasks
export const getAllTasks = async () => {
  const headers = addTokenToHeader({ headers: {} });
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/task`, {
    headers,
  });
  return res;
};

//get task by id
export const getTaskById = async (taskId) => {
  const headers = addTokenToHeader({ headers: {} });
  const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/task/${taskId}`,
    {
      headers,
    }
  );
  return res;
};

//move task to new status
export const moveTask = async (taskId, newStatus) => {
  const headers = addTokenToHeader({ headers: {} });
  const res = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/api/task/move/${taskId}`,
    { status: newStatus },
    {
      headers,
    }
  );
  return res;
};

//get tasks by status
export const getTasksByStatus = async (status) => {
  const headers = addTokenToHeader({ headers: {} });
  const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/task/status/${status}`,
    {
      headers,
    }
  );
  return res;
};

//update task
export const updateTask = async (taskId, data) => {
  const headers = addTokenToHeader({ headers: {} });
  const res = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/api/task/${taskId}`,
    data,
    {
      headers,
      "Content-Type": "application/json",
    }
  );
  return res;
};

//delete task
export const deleteTask = async (taskId) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `${token}`,
    "Content-Type": "application/json",
  };
  const res = await axios.delete(
    `${import.meta.env.VITE_BASE_URL}/api/task/${taskId}`,
    { headers }
  );
  return res;
};

// filter tasks by due date
export const getFilterTask = async (dateFilter) => {
  const headers = addTokenToHeader({ headers: {} });
  const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/task/filter/${dateFilter}`,
    {
      headers,
    }
  );
  return res;
};

//get analytics data
export const getAnalyticsData = async () => {
  const headers = addTokenToHeader({ headers: {} });
  const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/task/analytics`,
    {
      headers,
    }
  );
  return res;
};

//generate share task link
export const generateShareLink = async (taskId) => {
  const headers = addTokenToHeader({
    headers: { "Content-Type": "application/json" },
  });
  const res = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/taskshare/share/${taskId}`,
    {},
    { headers }
  );
  return res;
};

// Get shared task for public
export const getSharedTask = async (sharedId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/taskshare/shared/${sharedId}`
  );
  return res;
};

//assign people to board
export const assignBoardToUser = async (assignedEmail) => {
  const headers = addTokenToHeader({ headers: {} });
  const res = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/api/task/assignboard`,
    { assignedEmail },
    {
      headers,
      "Content-Type": "application/json",
    }
  );
  return res.data;
};
