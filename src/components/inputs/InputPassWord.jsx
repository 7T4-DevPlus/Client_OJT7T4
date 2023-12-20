import React from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Space } from 'antd';

const InputPassWord = () => {
  return (
    <Space direction="vertical">
      <Input.Password
        placeholder="input password"
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
    </Space>
  );
};
export default InputPassWord;
