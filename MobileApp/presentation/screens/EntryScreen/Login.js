import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import PrimaryButton from "../../components/PrimaryButton";
import EnteryInput from "../../components/EntryInput";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import EntryViewModel from "./EntryViewModel";
import { useNavigation } from "@react-navigation/native";

function Login() {
  const [activeInput, setActiveInput] = useState(-1);
  const { loginUser } = EntryViewModel();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setActiveInput(-1);
      }}
    >
      <View className="bg-[#000000d4] flex-1 items-center">
        <Image
          className="mt-12 w-96 h-36 mb-6"
          source={require("../../../assets/imgs/logo.png")}
        />
        <View className="p-4 self-stretch items-end">
          <View className="mb-6">
            <Text className="text-4xl text-white">Login</Text>
            <Text className="text-base text-[#8E8A8A]">
              please sign in to continue
            </Text>
          </View>

          <View className="items-end">
            <EnteryInput
              text={"Phone"}
              value={"0547973441"}
              icon={
                <FontAwesome name="mobile-phone" size={27} color="#ffffff8f" />
              }
              type="phone-pad"
              onPress={() => setActiveInput(0)}
              isActive={activeInput == 0}
              onChange={(value) => setPhone(value)}
            />
            <EnteryInput
              text={"Password"}
              value={""}
              icon={
                <MaterialIcons
                  name="lock-outline"
                  size={22}
                  color="#ffffff8f"
                />
              }
              type="password"
              onPress={() => setActiveInput(1)}
              isActive={activeInput == 1}
              onChange={(value) => setPassword(value)}
            />
          </View>
        </View>
        <PrimaryButton
          text={"LOGIN"}
          styles={{ borderRadius: 30, width: 188, height: 62, marginTop: 20 }}
          onPress={() => loginUser(phone, password)}
        />
        <View className="justify-end flex-1 mb-24">
          <Text className="text-base color-[#808080]">
            Don’t have an account?{" "}
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text className="color-[#faca2c]"> Sign up</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Login;
