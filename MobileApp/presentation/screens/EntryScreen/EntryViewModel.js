import UserRepository from "../../../repository/UserRepository";
import { AuthContext } from "../../../context/AuthContext";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../../hooks/useAuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EntryViewModel = () => {
  const userRepository = UserRepository();
  const { setLoading } = useLoadingContext();
  const { dispatch } = useAuthContext();
  const navigation = useNavigation();

  const loginUser = async (phone, password) => {
    // setLoading(true);
    console.log("1");
    try {
      const { status, data } = await userRepository.login(phone, password);
      console.log(data);
      await AsyncStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
    // setLoading(false);
  };

  const signupUser = async (fullName, phone, password) => {
    setLoading(true);
    try {
      const { status, data } = await userRepository.signup(
        fullName,
        phone,
        password
      );
      await AsyncStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "SIGNUP", payload: data });
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return { loginUser, signupUser };
};

export default EntryViewModel;
