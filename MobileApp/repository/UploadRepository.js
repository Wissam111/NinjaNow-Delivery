import { useApiContext } from "../hooks/useApiContext";
import { encode as btoa } from "base-64";

const UploadRepository = () => {
  const { apiCall } = useApiContext();
  //   const upload = async (imageFormData) => {
  //     const res = await axios.post("/api/upload-img", imageFormData);
  //     return res;
  //   };
  const getImage = async (imageId) => {
    const res = await apiCall(`upload-img/${imageId}`);
    arrayBufferToBase64 = (buffer) => {
      let binary = "";
      let bytes = new Uint8Array(buffer);
      let len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
    };
    return (
      "data:image/jpeg;base64," +
      arrayBufferToBase64(res.data.img.img.data.data)
    );
  };

  return { getImage };
};

export default UploadRepository;
