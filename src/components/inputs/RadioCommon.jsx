import React from 'react';
import { Radio } from "antd";

const RadioCommon = ({ ...props }) => {
    
    return (
        <>
            <Radio.Group {...props} />
            <br />
        </>
)};
export default RadioCommon;
