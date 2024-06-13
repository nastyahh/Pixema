import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { userActivate } from "../../store/userSlice";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { ActivateUser } from "../../utility/types";

const Activation = () => {
  const dispatch = useDispatch<ThunkDispatch<ActivateUser, unknown, Action>>();
  const activation = useParams();

  console.log(activation);
  useEffect(() => {
    dispatch(userActivate(activation as unknown as ActivateUser));
  }, []);

  return <div>Activation page</div>;
};

export default Activation;
