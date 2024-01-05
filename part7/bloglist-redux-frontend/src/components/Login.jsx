import { useDispatch } from "react-redux";
import { login } from "../reducers/loginReducer";
import Notification from "./Notification";
import { useField } from "../hooks";
import {
  AppBar,
  Button,
  TextField,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Login = () => {
  const username = useField("text");
  const password = useField("password");

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login(username.value, password.value));
  };

  return (
    <form onSubmit={handleLogin}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <MenuIcon />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Log in to application
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Notification />
      <div>
        <TextField
          id="username-input"
          label="username"
          margin="normal"
          {...username}
        />
      </div>
      <div>
        <TextField
          id="password-input"
          label="password"
          margin="normal"
          {...password}
        />
      </div>
      <Button
        variant="contained"
        id="login-button"
        color="inherit"
        type="submit"
      >
        login
      </Button>
    </form>
  );
};

export default Login;
