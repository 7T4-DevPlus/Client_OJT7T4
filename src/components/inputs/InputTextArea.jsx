import React from 'react';
import { Input } from 'antd';
const { TextArea } = Input;

const InputTextArea = ({ inputType, ...props }) => {
    return (
        <>
            <TextArea rows={3} {...props} />
        </>
    )
}
export default InputTextArea;
