import React, {useContext} from 'react'
import { ProjectContext } from '../../contexts/projectContext';
import { Modal } from 'antd';

import { format } from 'date-fns';

const EmployeeInProjectModal = ({empDetails}) => {
    const {
        employeeDetailsModal,
        setEmployeeDetailsModal
    } = useContext(ProjectContext);

    const handleCancel = () => {
        setEmployeeDetailsModal(false);
      };

  return (
    
    <Modal
      title={`${empDetails.employeeId.name} Details`}
      open={employeeDetailsModal}
      onCancel={handleCancel} 
      footer={null} 
    >
        <img src={empDetails.employeeId.image} alt="avatar"/>
        <p>Description</p>
        <p>{empDetails.description}</p>
        <br/>
        <p>Employee code: {empDetails.employeeId.code}</p>
        <p>Position: {empDetails.role.name}</p>
        <br/>
        <p>Join: {format(new Date(empDetails.joinDate), 'yyyy-MM-dd')}</p>
        <p>Out: {empDetails.outDate ? format(new Date(empDetails.outDate), 'yyyy-MM-dd') : "On working"}</p>
    </Modal>
  )
}

export default EmployeeInProjectModal