import { useParams } from "react-router-dom";
import { initUser } from "../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Notification from "./Notification";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Circle } from "@mui/icons-material";

const User = () => {
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const { id } = useParams();

  // In case of the single user separate BE endpoint and
  // reducer is created to find user by id. This is more
  // optimal way compared to BlogComments where all blogs
  // are used to find single blog with comments.
  // NOTE: Witout initUser and BE query to load single user
  // data route users/:id doesn't work when browser is refreshed
  // because store doesn't have user data after refresh.
  // Thus most optimal way to load data is to implement BE
  // endpoint with id.
  useEffect(() => {
    if (id) {
      dispatch(initUser(id));
    }
  }, [dispatch, id]);

  return (
    <>
      <Notification />
      {userData ? (
        <div>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            {userData.name}
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            added blogs
          </Typography>

          <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <List>
              {userData.blogs.map((r) => (
                <ListItem key={r.id} disablePadding>
                  <ListItemIcon>
                    <Circle sx={{ width: 10 }} />
                  </ListItemIcon>
                  <ListItemText primary={r.title} />
                </ListItem>
              ))}
            </List>
          </Box>
        </div>
      ) : (
        <div>{`could not load blogs for id: ${id}`}</div>
      )}
    </>
  );
};

export default User;
