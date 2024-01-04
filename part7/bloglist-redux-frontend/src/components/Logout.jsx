import { useDispatch } from "react-redux";
import { logout } from "../reducers/userReducer";

const Logout = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <>
      <h2>
        {user.name} logged in
        <button onClick={handleLogout} type="button">
          logout
        </button>
      </h2>
    </>
  );
};

export default Logout;
