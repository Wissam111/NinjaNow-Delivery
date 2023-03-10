import { createContext } from "react";
import { json } from "react-router-dom";

export const UploadContext = createContext();

export const UploadContextProvider = ({ children }) => {
  const upload = async (image, name) => {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("newImg", image.data);
    try {
      const response = await fetch("/api/upload-img", {
        method: "POST",
        body: formData,
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
    return json;
  };

  return (
    <UploadContext.Provider value={{ upload }}>
      {children}
    </UploadContext.Provider>
  );
};
