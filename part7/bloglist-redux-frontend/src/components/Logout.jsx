import { useDispatch } from "react-redux";
import { logout } from "../reducers/loginReducer";

const logoutStyle = {
  display: "flex",
  alignItems: "center",
  padding: ".25rem",
};

const labelStyle = {
  paddingRight: ".25rem",
};

const Logout = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div style={logoutStyle}>
      <div style={labelStyle}>{user.name} logged in</div>
      <button onClick={handleLogout} type="button">
        logout
      </button>
    </div>
  );
};

export default Logout;
