import { useState, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { cos } from "react-native-reanimated";
import CategoryCard from "./CategoryCard";
const Categories = (props) => {
  const { categories } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch("http://10.0.0.4:4000/api/categories", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await result.json();
        setData(json.categories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View className="">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
          alignSelf: "stretch",
        }}
        className="p-8"
      >
        {categories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}

        {/* <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard /> */}
      </ScrollView>
    </View>
  );
};
export default Categories;
