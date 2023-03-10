import { TailwindProvider } from "tailwindcss-react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContextProvider } from "./context/AuthContext";
import { ApiContextProvider } from "./context/ApiContext";

import Login from "./presentation/screens/EntryScreen/Login";
import SignUp from "./presentation/screens/EntryScreen/SignUp";
import Home from "./presentation/screens/HomeScreen/Home";
import Restaurant from "./presentation/screens/RestaurantScreen/Restaurant";
import Cart from "./presentation/screens/CartScreen/Cart";
import Orders from "./presentation/screens/OrdersScreen/Orders";
import OrderStatus from "./presentation/screens/OrderStatusScreen/OrderStatus";

import { NavigationContainer } from "@react-navigation/native";
import { LoadingContextProvider } from "./context/LoadingContext";
import { CartItemsContextProvider } from "./context/CartItemsContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <ApiContextProvider>
          <LoadingContextProvider>
            <CartItemsContextProvider>
              <TailwindProvider>
                <Stack.Navigator>
                  <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                      presentation: "fullScreenModal",
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="Signup"
                    component={SignUp}
                    options={{
                      presentation: "fullScreenModal",
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                      presentation: "fullScreenModal",
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="Restaurant"
                    component={Restaurant}
                    options={{
                      presentation: "modal",
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="Cart"
                    component={Cart}
                    options={{
                      presentation: "fullScreenModal",
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="Orders"
                    component={Orders}
                    options={{
                      presentation: "fullScreenModal",
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="OrderStatus"
                    component={OrderStatus}
                    options={{
                      presentation: "fullScreenModal",
                      headerShown: false,
                    }}
                  />
                </Stack.Navigator>
              </TailwindProvider>
            </CartItemsContextProvider>
          </LoadingContextProvider>
        </ApiContextProvider>
      </AuthContextProvider>
    </NavigationContainer>
  );
}
