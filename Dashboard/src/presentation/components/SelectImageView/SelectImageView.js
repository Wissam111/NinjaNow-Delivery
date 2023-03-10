import "./SelectImageView.css";
import Image from "../Image";
function SelectImageView(props) {
  const { onSelectFile, selectedFile, currImg } = props;
  return (
    <div className="select-file-wrapper">
      {selectedFile ? (
        <img src={selectedFile.preview} className="add-dishImage-primary" />
      ) : currImg ? (
        <Image imageId={currImg} classN="add-dishImage-primary" />
      ) : (
        <img
          src={require("./../../../assets/imgs/ramen.jpg")}
          className="add-dishImage-primary"
        />
      )}
      {/* <img
        src={selectedFile ? selectedFile.preview : currImg}
        className="add-dishImage-primary"
      /> */}
      <label onChange={onSelectFile} htmlFor="formId">
        <p>select image</p>
        <input name="" type="file" id="formId" hidden />
        <img src={require("../../../assets/icons/add-image.png")} />
      </label>
    </div>
  );
}

export default SelectImageView;
