import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log(action.payload);
      return { restaurant: action.payload };
    case "SIGNUP":
      return { restaurant: action.payload };
    case "LOGOUT":
      return { restaurant: null };
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    restaurant: null,
  });

  useEffect(() => {
    const restaurant = JSON.parse(localStorage.getItem("restaurant"));
    if (restaurant) {
      dispatch({ type: "LOGIN", payload: restaurant });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
