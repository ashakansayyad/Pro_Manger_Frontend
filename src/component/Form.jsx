import React from "react";
import styles from "./CSS/Form.module.css";
import { useState } from "react";
const InputFields = ({
  name,
  type,
  value,
  placeholder,
  onChange,
  icon,
  vicon,
  hicon,
}) => {
  const [isPwdVisible, setIsPwdVisible] = useState(false);
  const handlePasswordVisible = () => {
    setIsPwdVisible(!isPwdVisible);
  };
  const inputType = type === "password" && isPwdVisible ? "text" : type;

  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.inputField}
        type={inputType}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        style={{ backgroundImage: `url(${icon})` }}
      />
      {type === "password" && (
        <img
          className={styles.iconToggle}
          src={isPwdVisible ? hicon : vicon}
          onClick={handlePasswordVisible}
          alt=""
        />
      )}
    </div>
  );
};

function Form({
  formFields,
  error = {},
  errorMessage = {},
  handleSubmit,
  isRegister,
  isLogin,
}) {
  return (
    <form className={styles.form}>
      {formFields.map((field, index) => (
        <React.Fragment key={index}>
          <InputFields
            name={field.name}
            key={index}
            type={field.type}
            value={field.value}
            placeholder={field.placeholder}
            onChange={field.onChange}
            icon={field.icon}
            vicon={field?.vicon}
            hicon={field?.hicon}
          />
          {error?.[field.name] ? (
            <p id={styles.error}>{errorMessage?.[field.name]?.message}</p>
          ) : null}
        </React.Fragment>
      ))}
      {error?.isPasswordMatch && (
        <p id={styles.error}>{errorMessage?.isPasswordMatch?.message}</p>
      )}

      <button onClick={handleSubmit}>
        {isRegister ? "Register" : isLogin ? "Login" : "Update"}
      </button>
    </form>
  );
}

export default Form;
