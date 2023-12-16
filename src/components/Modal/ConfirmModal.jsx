import React, {useContext} from 'react';
import { Modal } from 'antd';
import ButtonCommon from '../buttons/ButtonCommon';
import { ComponentsContext } from '../../contexts/componentsContext';

const Dialog = ({ handleOk, handleCancel, title, message, visible }) => {

  return (
    <Modal
      title={title}
      onCancel={handleCancel} 
      footer={null} 
      open={visible}
    >
      <p>{message}</p>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ButtonCommon buttonType="cancel" handleOnClick={handleCancel} />
        <div style={{ marginLeft: '10px' }}>
          <ButtonCommon buttonType="delete-text" handleOnClick={handleOk} />
        </div>
      </div>
    </Modal>
  );
};

export default Dialog;
