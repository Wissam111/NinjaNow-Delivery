import { View, Text, Image, ImageBackground, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import UploadRepository from "../../repository/UploadRepository";
const ImageView = (props) => {
  const { imageId, classN } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const uploadRepository = UploadRepository();
  useEffect(() => {
    setLoading(true);
    setData(null);
    const getImage = async () => {
      try {
        const data = await uploadRepository.getImage(imageId);
        setData(data);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };
    getImage();
  }, [imageId]);
  return (
    <Image
      source={
        loading
          ? require("../../assets/imgs/loading4.gif")
          : {
              uri: data,
            }
      }
      className={classN}
    />
  );
};
{
}

export default ImageView;
