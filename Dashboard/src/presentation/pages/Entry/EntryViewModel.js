import AuthRepository from "../../../repository/AuthRepository";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
const EntryViewModel = () => {
  const authRepository = AuthRepository();
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const restaurantLogin = async (email, password) => {
    try {
      const { status, data } = await authRepository.restaurantLogin(
        email,
        password
      );
      if (status == 200) {
        localStorage.setItem("restaurant", JSON.stringify(data));
        dispatch({ type: "LOGIN", payload: data });
        navigate("/");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const restaurantSignup = async (email, password, name) => {
    try {
      const { status, data } = await authRepository.restaurantSignup(
        email,
        password,
        name
      );
      if (status == 200) {
        localStorage.setItem("restaurant", JSON.stringify(data));
        dispatch({ type: "SIGNUP", payload: data });
        navigate("/");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return { restaurantLogin, restaurantSignup };
};

export default EntryViewModel;
