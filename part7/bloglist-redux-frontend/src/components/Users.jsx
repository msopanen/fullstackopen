import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Link,
  Paper,
  TableHead,
} from "@mui/material";
import { initUsers } from "../reducers/usersReducer";
import Notification from "./Notification";
import { Link as RouterLink } from "react-router-dom";

const Users = ({ user }) => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(initUsers());
    }
  }, [dispatch, user]);

  return (
    <div>
      <Notification />
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Users
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Blogs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell key={user.id}>
                  <Link component={RouterLink} to={`${user.id}`}>
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
