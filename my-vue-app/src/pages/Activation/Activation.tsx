import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { userActivate } from "../../store/userSlice";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { ActivateUser } from "../../utility/types";
import { ReactComponent as Check } from "../../assets/approved_hya1wk9vwpf7.svg";
import styles from "./Activation.module.scss";

const Activation = () => {
  const dispatch = useDispatch<ThunkDispatch<ActivateUser, unknown, Action>>();
  const activation = useParams();

  console.log(activation);
  useEffect(() => {
    dispatch(userActivate(activation as unknown as ActivateUser));
  }, []);

  return (
    <div className={styles.activation}>
      <h1 className={styles.activation__title}>You are an activated user</h1>
      <Check className={styles.activation__icon} />
    </div>
  );
};

export default Activation;
