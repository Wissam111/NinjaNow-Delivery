import { useApiContext } from "../hooks/useApiContext";
const CategoryRepository = () => {
  const { apiCall } = useApiContext();
  const addCategory = async (categoryName, image) => {
    const data = apiCall("categories", "POST", { categoryName, image });
    return data;
  };

  const getCategories = async () => {
    const data = apiCall("categories");
    return data;
  };

  return { getCategories };
};

export default CategoryRepository;
