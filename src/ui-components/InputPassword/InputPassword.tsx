import { IPasswordInput } from "../../utility/types";
import styles from "../../pages/SignIn/SignIn.module.scss";
import { useState } from "react";
import { ReactComponent as EyeShow } from "../../assets/eye-open.svg";
import { ReactComponent as EyeHide } from "../../assets/eye-close.svg";

const InputPassword = ({
  value,
  onChange,
  placeholder = "Your password",
  name = "password",
}: IPasswordInput) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.inputWrap}>
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <button
        type="button"
        className={styles.eyeButton}
        onClick={togglePassword}
      >
        {showPassword ? (
          <EyeShow className={styles.eye} />
        ) : (
          <EyeHide className={styles.eye} />
        )}
      </button>
    </div>
  );
};

export default InputPassword;
