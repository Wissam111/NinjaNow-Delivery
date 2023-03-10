import { createContext, useReducer } from "react";
import { Alert } from "react-native";
export const CatItemsContext = createContext();

export const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADDTOCART":
      return { cartItems: [...state.cartItems, action.payload] };
    case "REMOVEFROMCART":
      const index = state.cartItems.findIndex(
        (item) => item._id == action.payload
      ); //find first one with same id
      let newItemsCart = [...state.cartItems];
      if (index >= 0) {
        newItemsCart.splice(index, 1); //2nd arg mean remv only one item
      } else {
        Alert.alert("Remove From Cart", "This Item does not exists in cart", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
      return { cartItems: newItemsCart };
    case "DELETECART":
      return { cartItems: [] };

    default:
      return state;
  }
};

export const CartItemsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, {
    cartItems: [],
  });

  const selectCartItemsById = (id) => {
    return state.cartItems.filter((dish) => dish._id == id);
  };
  const totalCartItems = () => {
    const total = state.cartItems.reduce((accumulator, dish) => {
      return accumulator + dish.price;
    }, 0);
    return total;
  };

  return (
    <CatItemsContext.Provider
      value={{ ...state, dispatch, selectCartItemsById, totalCartItems }}
    >
      {children}
    </CatItemsContext.Provider>
  );
};
