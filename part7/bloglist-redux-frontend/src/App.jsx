import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { initLogin } from "./reducers/loginReducer";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import User from "./components/User";
import BlogComments from "./components/BlogComments";

const padding = {
  paddingRight: ".25rem",
};

const linkBannerStyle = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "lightGrey",
};

const App = () => {
  const user = useSelector((state) => state.loggedUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initLogin());
  }, [dispatch]);

  return (
    <>
      {user ? (
        <>
          <Router>
            <div id="banner" style={linkBannerStyle}>
              <Link style={padding} to="/">
                blogs
              </Link>
              <Link style={padding} to="/users">
                users
              </Link>
              <Logout user={user} />
            </div>
            <h2>Blog app</h2>
            <Routes>
              <Route path="/" element={<Blogs user={user} />} />
              <Route path="/blogs/:id" element={<BlogComments />} />
              <Route path="/users" element={<Users user={user} />} />
              <Route path="/users/:id" element={<User />} />
            </Routes>
          </Router>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default App;
