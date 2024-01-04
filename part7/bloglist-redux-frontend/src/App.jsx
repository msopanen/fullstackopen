import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initUser } from "./reducers/userReducer";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Blogs from "./components/Blogs";
import Users from "./components/Users";

const App = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUser());
  }, [dispatch]);

  return (
    <>
      {user ? (
        <>
          <Logout user={user} />
          <Router>
            <Routes>
              <Route path="/" element={<Blogs user={user} />} />
              <Route path="/users" element={<Users user={user} />} />
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
