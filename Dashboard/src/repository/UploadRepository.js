// import { ApiCall } from "../network/ApiCall";
import { useApiContext } from "../hooks/useApiContext";
import axios from "axios";
const UploadRepository = () => {
  const { apiCall } = useApiContext();
  const upload = async (imageFormData) => {
    const res = await axios.post(
      "http://localhost:4000/api/upload-img",
      imageFormData
    );
    return res;
  };
  const getImage = async (imageId) => {
    const res = await apiCall(`upload-img/${imageId}`);

    const base64String = btoa(
      new Uint8Array(res.data.img.img.data.data).reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
      }, "")
    );
    return `data:image/png;base64,${base64String}`;
  };

  return { upload, getImage };
};

export default UploadRepository;
