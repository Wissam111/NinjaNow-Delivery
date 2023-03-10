import { useApiContext } from "../hooks/useApiContext";

const UserRepository = () => {
  const { apiCall } = useApiContext();

  const login = async (phone, password) => {
    const data = apiCall("users/login", "POST", { phone, password });
    return data;
  };

  const signup = async (fullName, phone, password) => {
    const data = apiCall("users/signup", "POST", { fullName, phone, password });
    return data;
  };

  return { login, signup };
};

export default UserRepository;
