import OrdersPage from "./presentation/pages/Orders/OrdersPage";
import "./css/app.css";
import NavBar from "./presentation/components/NavBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuPage from "./presentation/pages/Menu/MenuPage";
import SettingsPage from "./presentation/pages/SettingsP/SettingsPage";
import EntryPage from "./presentation/pages/Entry/EntryPage";
import DashBoardPage from "./presentation/pages/DashBoard/DashBoardPage";
import { useAuthContext } from "./hooks/useAuthContext";
import ProtectedRoute from "./presentation/components/ProtectedRoute/ProtectedRoute";
import LoadingScreen from "./presentation/components/LoadingScreen/LoadingScreen";
import { useLoadingContext } from "./hooks/useLoadingContext";
function App() {
  //check if loggedin
  const { restaurant } = useAuthContext();
  const { loading } = useLoadingContext();
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        {loading && <LoadingScreen />}
        {restaurant && <NavBar />}
        <Routes>
          <Route exact path="/orders" element={<ProtectedRoute />}>
            <Route exact path="/orders" element={<OrdersPage />} />
          </Route>
          <Route exact path="/settings" element={<ProtectedRoute />}>
            <Route exact path="/settings" element={<SettingsPage />} />
          </Route>
          <Route exact path="/menu" element={<ProtectedRoute />}>
            <Route exact path="/menu" element={<MenuPage />} />
          </Route>
          <Route exact path="/" element={<ProtectedRoute />}>
            <Route exact path="/" element={<DashBoardPage />} />
          </Route>
          {/* <Route path="orders" element={<OrdersPage />} /> */}
          <Route path="entry" element={<EntryPage />} />
        </Routes>
        {/* <div className="app-wrapper"> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
