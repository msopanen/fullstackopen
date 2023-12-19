import { useSelector } from "react-redux";

const Notification = () => {
<<<<<<< HEAD
  const notification = useSelector((state) => state.notification.text);
=======
  const notification = useSelector((state) => state.notification);
>>>>>>> df463a0 (Add exercise 6.12 anecdotes, step10)

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  return <div style={style}>{notification}</div>;
};

export default Notification;
