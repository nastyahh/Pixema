import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { userActivate } from "../../store/userSlice";

const Activation = () => {
  const dispatch = useDispatch();
  const { uid, token } = useParams();

  useEffect(() => {
    try {
      dispatch(userActivate({ uid: uid, token: token }));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return <div>Activation page</div>;
};

export default Activation;
