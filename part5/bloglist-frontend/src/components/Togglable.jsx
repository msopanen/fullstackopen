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
    <div>
      <div style={hideIfVisible}>
        <button id={btnId} onClick={toggleVisibility}>
          {props.btnLabel}
        </button>
      </div>
      <div style={showIfVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

export default Togglable;
