import "./LoadingScreen.css";

import { useLoadingContext } from "../../../hooks/useLoadingContext";
function LoadingScreen() {
  const { loading } = useLoadingContext();
  //   if (!loading) {
  //     return null;
  //   }
  return (
    <div className="loading-screen-wrapper page-container">
      {/* <img src={require("../../../assets/imgs/loader2.gif")} /> */}
    </div>
  );
}

export default LoadingScreen;
