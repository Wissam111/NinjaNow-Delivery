import { useApiContext } from "../hooks/useApiContext";
const CategoryRepository = () => {
  const { apiCall } = useApiContext();

  const addCategory = async (categoryName, image) => {
    const data = apiCall("categories", "POST", { categoryName, image });
    return data;
  };

  return { addCategory };
};

export default CategoryRepository;
