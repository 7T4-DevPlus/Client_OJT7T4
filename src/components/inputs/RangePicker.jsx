import React from 'react';
import { DatePicker } from 'antd';
const  { RangePicker } = DatePicker;

const RangeDateCommon = ({ ...props }) =>{

  return(
    <>
      <RangePicker {...props} />
    </>
  );
} 

export default RangeDateCommon;
