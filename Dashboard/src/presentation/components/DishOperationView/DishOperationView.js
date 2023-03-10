import "./DishOperationView.css";
import { useState, useEffect } from "react";
import SelectImageView from "../SelectImageView/SelectImageView";

function DishOperationView(props) {
  const {
    handleCloseAddDish,
    handleDish,
    selectedDish,
    buttomText,
    handleDeleteDish,
  } = props;
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    const selectedFile = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setSelectedFile(selectedFile);
  };
  useEffect(() => {
    if (selectedDish) {
      setName(selectedDish?.name);
      setPrice(selectedDish?.price);
    }
  }, [selectedDish]);

  return (
    <div className="add-dish-container">
      <img
        onClick={() => {
          handleCloseAddDish();
          setSelectedFile(null);
        }}
        className="close-dish-icon"
        src={require("../../../assets/icons/fork-knife.png")}
      />
      <div className="form-wrapper">
        <SelectImageView
          onSelectFile={onSelectFile}
          selectedFile={selectedFile}
          currImg={selectedDish?.image}
        />
        <input
          placeholder="dish name"
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          value={price}
          type={"text"}
          placeholder="price"
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <button
        className="submit-Btn"
        onClick={() => handleDish(name, Number(price), selectedFile?.data)}
      >
        {buttomText}
      </button>
      {selectedDish && (
        <img
          className="dishOpration-trash-bin"
          src={require("../../../assets/icons/trash-bin.png")}
          onClick={handleDeleteDish}
        />
      )}
    </div>
  );
}

export default DishOperationView;
