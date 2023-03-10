import { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Image from "../Image";
function NavBar() {
  const [activeNav, setActiveNav] = useState(0);
  const { restaurant: data, dispatch } = useAuthContext();
  const restaurant = data.restaurant;
  return (
    <div className="navbar-container">
      {/* <img
        className="userLogo"
        src={require("../../../assets/imgs/prof2.jpg")}
      /> */}
      <Image imageId={restaurant?.image} classN="userLogo" />
      <ul className="nav-links">
        {/* <li className={activeNav == 0 && "active"}>
          <Link to="/" className="nav-link" onClick={() => setActiveNav(0)}>
            <img src={require("../../../assets/icons/dashboard.png")} />
          </Link>
        </li> */}

        <li className={activeNav == 1 && "active"}>
          <Link
            to="/orders"
            className="nav-link"
            onClick={() => setActiveNav(1)}
          >
            <img src={require("../../../assets/icons/TasksIcon.png")} />
          </Link>
        </li>
        <li className={activeNav == 2 && "active"}>
          <Link to="/menu" className="nav-link" onClick={() => setActiveNav(2)}>
            <img src={require("../../../assets/icons/dishIcon.png")} />
          </Link>
        </li>

        <li className={activeNav == 3 && "active"}>
          <Link
            to="/settings"
            className="nav-link"
            onClick={() => setActiveNav(3)}
          >
            <img src={require("../../../assets/icons/settingIcon.png")} />
          </Link>
        </li>
      </ul>

      <div className="logout-wrapper">
        <Link to="/entry" className="nav-link">
          <img
            onClick={() => {
              setActiveNav(-1);
              localStorage.removeItem("restaurant");
              dispatch({ type: "LOGOUT" });
            }}
            src={require("../../../assets/icons/logoutIcon.png")}
          />
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
