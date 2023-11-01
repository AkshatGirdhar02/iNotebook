import React, { useEffect, useState } from "react";

export const Alert = (props) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return visible ? (
    <div className="alert alert-primary" role="alert">
      {props.message}
    </div>
  ) : null;
};
