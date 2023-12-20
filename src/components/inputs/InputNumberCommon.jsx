import React from 'react';
import { InputNumber } from 'antd';

const InputNumberCommon = ({ ...props }) => {
    return (
        <>
            <InputNumber {...props} />
        </>
    )
}

export default InputNumberCommon