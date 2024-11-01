import React, { useState } from "react";
import Form from "../../component/Form";
import styles from "./Register.module.css";
import { register } from "../../apis/user";
import big_log from "../../assets/register.png";
import back_img from "../../assets/back_color.png";
import userIcon from "../../assets/uerlogo.png";
import emailIcon from "../../assets/email_log.png";
import pwdIcon from "../../assets/password_log.png";
import pwdViewIcon from "../../assets/view_pwd.png";
import pwdHideIcon from "../../assets/hide_pwd.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
    cpassword: false,
    isPasswordMatch: false,
  });

  // fields with validation
  const formFields = [
    {
      name: "name",
      type: "text",
      icon: userIcon,
      placeholder: "Name",
      value: formData.name,
      onChange: (e) => {
        setFormData({ ...formData, name: e.target.value });
        setError({ ...error, name: false });
      },
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      icon: emailIcon,
      value: formData.email,
      onChange: (e) => {
        setFormData({ ...formData, email: e.target.value });
        setError({ ...error, email: false });
      },
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      icon: pwdIcon,
      vicon: pwdViewIcon,
      hicon: pwdHideIcon,
      value: formData.password,
      onChange: (e) => {
        setFormData({ ...formData, password: e.target.value });
        setError({ ...error, password: false, isPasswordMatch: false });
      },
    },
    {
      name: "cpassword",
      type: "password",
      placeholder: "Confirm Password",
      icon: pwdIcon,
      vicon: pwdViewIcon,
      hicon: pwdHideIcon,
      value: formData.cpassword,
      onChange: (e) => {
        setFormData({ ...formData, cpassword: e.target.value });
        setError({ ...error, cpassword: false, isPasswordMatch: false });
      },
    },
  ];

  const errorMessage = {
    name: { message: "Name is required!" },
    email: { message: "Email is required!" },
    password: { message: "Password is required!" },
    cpassword: { message: "Confirm Password is required!" },
    isPasswordMatch: { message: "Passwords do not match!" },
  };

  // Password validation regex
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  // Email validation regex
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //name validation
  const namePattern = /^[a-zA-Z\s]*$/;

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    let isError = false;

    if (!formData.name) {
      setError((prev) => ({ ...prev, name: true }));
      isError = true;
    } else if (!namePattern.test(formData.name)) {
      toast.error("Name can only contain alphabets.", { theme: "colored" });
      isError = true;
    }

    if (!formData.email) {
      setError((prev) => ({ ...prev, email: true }));
      isError = true;
    } else if (!emailPattern.test(formData.email)) {
      toast.error("Please enter a valid email address.", { theme: "colored" });
      isError = true;
    }

    if (!formData.password) {
      setError((prev) => ({ ...prev, password: true }));
      isError = true;
    } else if (!passwordPattern.test(formData.password)) {
      toast.error(
        "Password must be at least 8 characters long, contain an uppercase letter, lowercase letter, symbol, and a number.",
        {
          theme: "colored",
        }
      );
      isError = true;
    }
    if (!formData.cpassword) {
      setError((prev) => ({ ...prev, cpassword: true }));
      isError = true;
    } else if (formData.password !== formData.cpassword) {
      setError((prev) => ({ ...prev, isPasswordMatch: true }));
      isError = true;
    }
  
    if (!isError) {
      try {
        const { name, email, password } = formData;
        const userData = { name, email, password };

        const res = await register(userData);
        if (res.status === 201) {
          toast.success("User registered successfully!", { theme: "colored" });
          navigate("/login");
        }
      } catch (err) {
        if (err.response && err.response.status === 400) {
          toast.error(err.response.data.message, { theme: "colored" });
        } else {
          console.error(err.response);
        }
      }
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.register_left}>
        <div className={styles.register_left_img_container}>
          <img id={styles.back_img} src={back_img} alt="" />
          <img id={styles.main_img} src={big_log} alt="img" />
        </div>
        <div className={styles.register_left_title_container}>
          <h2>Welcome aboard my friend</h2>
          <p>Just a couple of clicks and we start</p>
        </div>
      </div>
      <div className={styles.register_right}>
        <header className={styles.register_header}>
          <h2>Register</h2>
        </header>
        <Form
          formFields={formFields}
          error={error}
          errorMessage={errorMessage}
          handleSubmit={handleRegisterSubmit}
          isRegister={true}
        />
        <footer className={styles.register_footer}>
          <p>Have an account?</p>
          <button onClick={() => navigate("/login")}>Log in</button>
        </footer>
      </div>
    </div>
  );
}

export default Register;
