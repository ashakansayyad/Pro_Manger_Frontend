import React from "react";
import {
  Register,
  Login,
  Notfound,
  Dashboard,
  ViewSharedTask,
} from "./pages/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Modal } from "./context/Modal";
import { UserProvider } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
function App() {
  return (
    <Modal>
      <ToastContainer />
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Notfound />} />
            <Route
              path="/taskshare/shared/:sharedId"
              element={<ViewSharedTask />}
            />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </Modal>
  );
}

export default App;
