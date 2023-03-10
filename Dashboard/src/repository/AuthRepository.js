// import {  ApiCall } from "../network/ApiCall";
// import { ApiCall } from "../network/ApiCall";
import { useApiContext } from "../hooks/useApiContext";
import { useAuthContext } from "../hooks/useAuthContext";
const AuthRepository = () => {
  const { dispatch } = useAuthContext();
  const { apiCall } = useApiContext();
  //login restaurant to the dashboard
  const restaurantLogin = async (email, password) => {
    const data = apiCall("restaurants/login", "POST", { email, password });
    console.log(data);
    return data;
  };

  //creating new restaurant
  const restaurantSignup = async (email, password, name) => {
    const data = apiCall("restaurants/", "POST", { email, password, name });
    return data;
  };
  return { restaurantLogin, restaurantSignup };
};

export default AuthRepository;
