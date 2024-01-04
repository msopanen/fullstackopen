import { useDispatch } from "react-redux";
import { login } from "../reducers/loginReducer";
import { useState } from "react";
import Notification from "./Notification";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>log in to application</h1>
      <Notification />
      <div>
        username
        <input
          id="username-input"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password-input"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );
};

export default Login;
