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
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const App = () => {
  const user = useSelector((state) => state.loggedUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initLogin());
  }, [dispatch]);

  return (
    <Container xs={{ display: "flex" }}>
      {user ? (
        <>
          <Router>
            <AppBar position="static">
              <Toolbar>
                <MenuIcon />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Blogs app
                </Typography>
                <Button color="inherit">
                  <Link to="/">blogs</Link>
                </Button>
                <Button color="inherit">
                  <Link to="/users">users</Link>
                </Button>
                <Logout user={user} />
              </Toolbar>
            </AppBar>
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
    </Container>
  );
};

export default App;
