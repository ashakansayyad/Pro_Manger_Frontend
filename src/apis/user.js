import axios from "axios";
import { addTokenToHeader } from "../utils/auth";

// register api
export const register = async (data) => {
  const res = axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/user/register`,
    data,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return res;
};

// login api
export const login = async (data) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/user/login`,
    data,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return res;
};

// get all data of logged user
export const getUserData = async (id) => {
  const headers = addTokenToHeader({ headers: {} });
  const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/user/${id}`,
    {
      headers,
    }
  );
  return res;
};

//get all users (email) for assign dropdown
export const getAllUsers = async () => {
  const headers = addTokenToHeader({ headers: {} });
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user`, {
    headers,
  });
  return res;
};

// Update user information
export const updateUser = async (id, data) => {
  const headers = addTokenToHeader({ headers: {} });
  const res = await axios.patch(
    `${import.meta.env.VITE_BASE_URL}/api/user/${id}`,
    data,
    { headers }
  );
  return res;
};
