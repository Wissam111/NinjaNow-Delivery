import "./EntryPage.css";
import Signup from "../../components/Signup/Signup";
import Login from "../../components/Login/Login";
import { useState } from "react";
import EntryViewModel from "./EntryViewModel";
function EntryPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { restaurantLogin, restaurantSignup } = EntryViewModel();
  return (
    <div className="entryPage-container page-container">
      <div className="entry-nav">
        <img src={require("../../../assets/imgs/restaurantLogo.png")}></img>
        <div className="entry-nav-cta">
          <button
            className={!isLogin && "active"}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
          <button
            className={isLogin && "active"}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
        </div>
      </div>
      {isLogin ? (
        <Login restaurantLogin={restaurantLogin} />
      ) : (
        <Signup restaurantSignup={restaurantSignup} />
      )}
    </div>
  );
}

export default EntryPage;
