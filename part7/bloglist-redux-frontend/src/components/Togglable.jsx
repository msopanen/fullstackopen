import { Button } from "@mui/material";
import { useState, forwardRef, useImperativeHandle } from "react";

// eslint-disable-next-line react/display-name
const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideIfVisible = { display: visible ? "none" : "" };
  const showIfVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  const btnId = `${props.btnLabel}-toggle-button`;

  return (
    <div style={{ display: "flex" }}>
      <div style={hideIfVisible}>
        <Button variant="contained" id={btnId} onClick={toggleVisibility}>
          {props.btnLabel}
        </Button>
      </div>
      <div style={showIfVisible}>
        {props.children}
        <Button variant="contained" onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </div>
  );
});

export default Togglable;
