import { useDispatch } from "react-redux";
import { logout } from "../reducers/loginReducer";
import { Button } from "@mui/material";

const logoutStyle = {
  display: "flex",
  alignItems: "center",
  padding: ".25rem",
};

const Logout = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div style={logoutStyle}>
      <div>{user.name} logged in</div>
      <Button color="inherit" onClick={handleLogout}>
        logout
      </Button>
    </div>
  );
};

export default Logout;
