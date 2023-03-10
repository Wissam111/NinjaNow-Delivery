import "./Login.css";
import { useState } from "react";

function Login(props) {
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const { restaurantLogin } = props;
  return (
    <div className="login-container">
      <h1>Login to your account</h1>
      <div className="login-form">
        <input
          type={"email"}
          placeholder="example@hotmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={"password"}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="entryBtn"
          onClick={() => restaurantLogin(email, password)}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
