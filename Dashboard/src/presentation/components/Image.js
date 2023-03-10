import { useState, useEffect } from "react";
import UploadRepository from "../../repository/UploadRepository";
// import { useLoadingContext } from "../../hooks/useLoadingContext";
function Image(props) {
  const { imageId, classN } = props;
  // const { setLoading } = useLoadingContext();
  const [loading, setLoading] = useState(false);
  const uploadRepository = UploadRepository();
  const [data, setData] = useState("");
  //   "63a092f1d9a855a946508963"
  useEffect(() => {
    setLoading(true);
    setData("");
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
    <img
      src={loading ? require("../../assets/imgs/dish-loading.gif") : data}
      className={classN}
    />
  );
}

export default Image;
