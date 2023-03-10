import {
  View,
  TouchableWithoutFeedback,
  Image,
  SafeAreaView,
  TextInput,
  Keyboard,
  ScrollView,
  Text,
} from "react-native";
import Categories from "../../components/Categories";
import { AntDesign } from "@expo/vector-icons";
import PopularDishes from "../../components/PopularDishes";
import Restaurants from "../../components/Restaurants";
import RestaurantsSheet from "../../components/RestaurantsSheet";
import HomeViewModel from "./HomeViewModel";
import Loading from "../../components/Loading";
import NavBar from "../../components/NavBar";
function Home() {
  const { categories, restaurants } = HomeViewModel();
  return (
    <>
      <NavBar />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          className="flex-1 bg-[#000000d4]"
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <Loading />
          <Image
            className="mt-12 w-24 h-24"
            source={require("../../../assets/imgs/ninjaWep.png")}
          />
          <View className="p-2 mt-5 items-center justify-center">
            <TextInput
              className="bg-[#66666661] pr-10 text-white w-80 h-14 rounded-full"
              placeholder="search for a restaurant"
              placeholderTextColor="#f8c6058a"
            />
            <AntDesign
              name="search1"
              size={24}
              color="#FAD02C"
              style={{ position: "absolute", right: 35 }}
            />
          </View>
          <Categories categories={categories} />
          <PopularDishes />
          <Restaurants restaurants={restaurants} />
          {/* <RestaurantsSheet /> */}
        </ScrollView>
      </TouchableWithoutFeedback>
    </>
  );
}

export default Home;
