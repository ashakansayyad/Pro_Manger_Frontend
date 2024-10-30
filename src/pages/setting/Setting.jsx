import React, { useState, useContext, useEffect } from "react";
import Form from "../../component/Form";
import styles from "./Setting.module.css";
import { toast } from "react-toastify";
import { updateUser } from "../../apis/user";
import { UserContext } from "../../context/UserContext";
import userIcon from "../../assets/uerlogo.png";
import emailIcon from "../../assets/email_log.png";
import pwdIcon from "../../assets/password_log.png";
import pwdViewIcon from "../../assets/view_pwd.png";
import pwdHideIcon from "../../assets/hide_pwd.png";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../apis/user";
function Setting() {
  const { loggedUserId, setLoggedUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const isValidPassword = (pwd) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(pwd);
  };
  const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z\s]*$/;
    return nameRegex.test(name);
  };
  const fetchUserData = async () => {
    try {
      const res = await getUserData(loggedUserId);
      if (res && res.data) {
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          oldPassword: "",
          newPassword: "",
        });
      }
    } catch (err) {
      console.error("Error fetching logged user data: ", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //if all fields are empty
    if (
      !formData.name &&
      !formData.email &&
      !formData.oldPassword &&
      !formData.newPassword
    ) {
      toast.error("At least one field is required to update !");
      return;
    }
    //check email validation
    if (formData.email && !isValidEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    //check name validation
    if (formData.name && !isValidName(formData.name)) {
      toast.error("Name can only contain alphabets.", { theme: "colored" });
      return;
    }
    // check  new password validation
    if (formData.newPassword && !isValidPassword(formData.newPassword)) {
      toast.error(
        "Password must be at least 8 characters long, contain an uppercase letter, lowercase letter, symbol, and a number.",
        { theme: "colored" }
      );
      return;
    }

    // Check which fields are filled in
    const { name, email, oldPassword, newPassword } = formData;
    const fieldsToUpdate = { name, email, oldPassword, newPassword };

    // Filter out empty fields
    const filledFields = Object.keys(fieldsToUpdate).filter(
      (key) => fieldsToUpdate[key]
    );

    const isUpdatingPassword = oldPassword && newPassword;
    const isSingleFieldUpdate = filledFields.length === 1;
    const isOnlyPasswordFields =
      filledFields.length === 2 && isUpdatingPassword;

    if (!isSingleFieldUpdate && !isOnlyPasswordFields) {
      toast.error(
        "You can update only one field at a time, or both password fields together.",
        {
          theme: "colored",
        }
      );
      return;
    }

    if ((oldPassword && !newPassword) || (!oldPassword && newPassword)) {
      toast.error(
        "Both old and new passwords are required to change the password.",
        {
          theme: "colored",
        }
      );
      return;
    }

    try {
      const res = await updateUser(loggedUserId, fieldsToUpdate);
      if (res.status === 200) {
        toast.success("Your information updated successfully!", {
          theme: "colored",
        });

        // Redirect to login page if email or password is changed
        if (email || newPassword) {
          setLoggedUserData(null);
          localStorage.removeItem("userToken");
          toast.info("Please log in again due to email/password change.", {
            theme: "colored",
          });
          navigate("/login");
        }
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else {
        console.error(err.response);
      }
    }
  };
  const formFields = [
    {
      name: "name",
      type: "text",
      icon: userIcon,
      placeholder: "Name",
      value: formData.name,
    },
    {
      name: "email",
      type: "email",
      icon: emailIcon,
      placeholder: "Email",
      value: formData.email,
    },
    {
      name: "oldPassword",
      type: "password",
      icon: pwdIcon,
      vicon: pwdViewIcon,
      hicon: pwdHideIcon,
      placeholder: "Old Password",
      value: formData.oldPassword,
    },
    {
      name: "newPassword",
      type: "password",
      icon: pwdIcon,
      vicon: pwdViewIcon,
      hicon: pwdHideIcon,
      placeholder: "New Password",
      value: formData.newPassword,
    },
  ];

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className={styles.setting}>
      <h2>Settings</h2>
      <div className={styles.setting_form}>
        <Form
          formFields={formFields.map((field) => ({
            ...field,
            onChange: (e) =>
              setFormData({ ...formData, [field.name]: e.target.value }),
          }))}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default Setting;
