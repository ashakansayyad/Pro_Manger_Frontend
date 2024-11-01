import React, { useState ,useEffect} from "react";
import Form from "../../component/Form";
import styles from "./Login.module.css";
import { login } from "../../apis/user";
import big_log from "../../assets/register.png";
import back_img from "../../assets/back_color.png";
import emailIcon from "../../assets/email_log.png";
import pwdIcon from "../../assets/password_log.png";
import pwdViewIcon from "../../assets/view_pwd.png";
import pwdHideIcon from "../../assets/hide_pwd.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(()=>{
    if(token){
       navigate('/');
    }
  },[]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const formFields = [
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
        setError({ ...error, password: false });
      },
    },
  ];

  // Error message handling
  const errorMessage = {
    email: { message: "Email is required!" },
    password: { message: "Password is required!" },
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    let isError = false;

    if (!formData.email) {
      setError((prev) => ({ ...prev, email: true }));
      isError = true;
    }
    if (!formData.password) {
      setError((prev) => ({ ...prev, password: true }));
      isError = true;
    }

    if (!isError) {
      try {
        const res = await login(formData);
        if (res.status === 200) {
          toast.success("Logged in Successfully!", { theme: "colored" });
          const token = res.data.token;
          localStorage.setItem("token", token);
          navigate("/");
          location.reload();
        } else {
          alert();
          toast.error("Something went wrong", { theme: "colored" });
        }
      } catch (error) {
        if (error.response.status === 400) {
          toast.error(error.response.data.message, { theme: "colored" });
        }
      }
    }
  };

  
  return (
    <div className={styles.login}>
      <div className={styles.login_left}>
        <div className={styles.login_left_img_container}>
          <img id={styles.back_img} src={back_img} alt="" />
          <img id={styles.main_img} src={big_log} alt="img" />
        </div>
        <div className={styles.login_left_title_container}>
          <h2>Welcome aboard my friend</h2>
          <p>Just a couple of clicks and we start</p>
        </div>
      </div>
      <div className={styles.login_right}>
        <header className={styles.login_header}>
          <h2>Login</h2>
        </header>
        <Form
          formFields={formFields}
          error={error}
          errorMessage={errorMessage}
          handleSubmit={handleLoginSubmit}
          isLogin={true}
        />
        <footer className={styles.login_footer}>
          <p>Have no account?</p>
          <button onClick={() => navigate("/register")}>Register</button>
        </footer>
      </div>
    </div>
  );
}

export default Login;
