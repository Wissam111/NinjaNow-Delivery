import "./Settings.css";
import React, { useState, useEffect } from "react";
import SelectImageView from "../../components/SelectImageView/SelectImageView";
import SettingsViewModel from "./SettingsViewModel";
function SettingsPage() {
  const { restaurant, updateRestaurant, handleOpenClose } = SettingsViewModel();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
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
    setName(restaurant?.name);
    setEmail(restaurant?.email);
    setLocation(restaurant?.location);
  }, []);

  return (
    <div className="settingsPage-container page-container">
      <div className="settings-row-wrapper">
        <button
          className={`restaurant-open-close-btn ${
            restaurant.isOpen ? "openBtn" : "closeBtn"
          }`}
          onClick={handleOpenClose}
        >
          {restaurant?.isOpen ? "OPEN" : "CLOSED"}
        </button>

        <div className="setting-form-wrapper">
          <h1 className="pageLogo">Restaurant Profile</h1>
          <SelectImageView
            onSelectFile={onSelectFile}
            selectedFile={selectedFile}
            currImg={restaurant.image}
          />
          <div className="restaurant-form">
            <input
              defaultValue={email}
              type={"email"}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              defaultValue={restaurant.name}
              type={"text"}
              placeholder="restaurant name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              defaultValue={restaurant.location}
              type={"text"}
              placeholder="restaurant location"
              onChange={(e) => setLocation(e.target.value)}
            />

            <button
              className="save-Btn submit-Btn"
              onClick={() =>
                updateRestaurant(email, name, location, selectedFile?.data)
              }
            >
              {" "}
              Save Changes
            </button>
          </div>
        </div>
        <div className="setting-img-wrapper">
          <img src={require("./../../../assets/imgs/delevieryS.png")}></img>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
