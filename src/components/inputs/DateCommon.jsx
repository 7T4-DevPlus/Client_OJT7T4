import React from 'react';
import { DatePicker } from 'antd';
const  { RangePicker } = DatePicker;

const DateCommon = ({ ...props }) =>{

  return(
    <>
      <DatePicker {...props} />
    </>
  );
} 

export default DateCommon;
