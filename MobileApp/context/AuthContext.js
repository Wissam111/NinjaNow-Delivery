import { createContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext();
import { useNavigation } from "@react-navigation/native";
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "SIGNUP":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  const navigation = useNavigation();

  useEffect(() => {
    getData = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user) {
          dispatch({ type: "LOGIN", payload: JSON.parse(user) });
          navigation.navigate("Home");
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
