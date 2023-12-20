import React from 'react';
import { DatePicker } from "antd";

const DateCommon = ({ ...props }) =>{

  return(
    <>
      <DatePicker {...props} />
    </>
  );
} 

export default DateCommon;
