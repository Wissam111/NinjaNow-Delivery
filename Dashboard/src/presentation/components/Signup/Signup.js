import { useState } from "react";
import "./Signup.css";

function Signup(props) {
  const { restaurantSignup } = props;
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);

  return (
    <div className="signup-container">
      <h1>Create New Account</h1>
      <div className="signup-form">
        <input
          type={"text"}
          placeholder="full name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type={"email"}
          placeholder="example@hotmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="password"
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="entryBtn"
          onClick={() => restaurantSignup(email, password, name)}
        >
          Create account
        </button>
      </div>
    </div>
  );
}

export default Signup;
