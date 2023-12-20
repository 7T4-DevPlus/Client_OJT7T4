import React from "react";
import { Checkbox } from "antd";

const CheckBoxCommon = ({ ...props }) => {
  return (
    <>
      <Checkbox.Group {...props} />
      <br />
    </>
  );
};

export default CheckBoxCommon;
