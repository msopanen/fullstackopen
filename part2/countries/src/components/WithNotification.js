const style = {
  color: "red",
  backgroundColor: "lightgrey",
  borderStyle: "solid",
  borderColor: "red",
  borderRadius: ".5rem",
  fontSize: "1.25rem",
  padding: "1rem",
  marginBottom: "1rem",
};

const Notification = ({ message }) => <div style={style}>{message}</div>;

const WithNotification = ({ message, children }) => {
  return message ? <Notification message={message} /> : children;
};

export default WithNotification;
