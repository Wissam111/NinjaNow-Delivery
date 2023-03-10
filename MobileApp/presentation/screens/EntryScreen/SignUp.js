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
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import EntryViewModel from "./EntryViewModel";
function SignUp(props) {
  // const { handleChangeEntry } = props;
  const { signupUser } = EntryViewModel();
  const [activeInput, setActiveInput] = useState(-1);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setActiveInput(-1);
      }}
    >
      <View className="bg-[#000000d4] flex-1 items-center">
        <SafeAreaView>
          <View className="p-4 self-stretch items-end">
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Ionicons name="arrow-back-outline" size={35} color="white" />
            </TouchableOpacity>
            <View className="mb-6 mt-5 p-4">
              <Text className="text-4xl text-white">Create Account</Text>
              <Text className="text-base text-[#8E8A8A]">
                please fill the inputs below here
              </Text>
            </View>
            <View className="items-end">
              <EnteryInput
                text={"Full Name"}
                icon={<Ionicons name="person" size={21} color="#ffffff8f" />}
                type="text"
                onPress={() => setActiveInput(0)}
                isActive={activeInput == 0}
                onChange={(value) => setFullName(value)}
              />
              <EnteryInput
                text={"Phone"}
                icon={
                  <FontAwesome
                    name="mobile-phone"
                    size={27}
                    color="#ffffff8f"
                  />
                }
                type="phone-pad"
                onPress={() => setActiveInput(1)}
                isActive={activeInput == 1}
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
                onPress={() => setActiveInput(2)}
                isActive={activeInput == 2}
                onChange={(value) => setPassword(value)}
              />
            </View>
          </View>
        </SafeAreaView>
        <PrimaryButton
          text={"SIGN UP"}
          styles={{ borderRadius: 30, width: 188, height: 62, marginTop: 20 }}
          onPress={() => signupUser(fullName, phone, password)}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default SignUp;
