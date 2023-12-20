import React, { useState, useContext, useEffect } from 'react';
import { Table, Space } from 'antd';
import ButtonCommon from '../buttons/ButtonCommon';
import ConfirmModal from '../Modal/ConfirmModal';
import EmployeeInProjectModal from './employeeInProjectModal';
import { ProjectContext } from '../../contexts/projectContext';

const EmployeeInProject = (employeesInProject) => {

    const {
        removeEmployeeFromProject,
        setEmployeeDetailsModal,
        setAddEmployeeModal,
        projectState: { project },
    } = useContext(ProjectContext);

    useEffect(() => {}, [employeesInProject]);

    const empInPro = employeesInProject.employeesInProject;

    const filteredEmpInPro = empInPro.filter(emp => ((emp.isWorking === true) && (emp.employeeId.isDelete === false)));

    const [empId, setEmpId] = useState('');
    const [empDetails, setEmpDetails] = useState(null);

    const handleDetails = (record) => {
        setEmployeeDetailsModal(true);
        setEmpDetails(record);
    };

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const handleDelete = (empId) => {
        removeEmployeeFromProject(empId);
        setShowConfirmModal(false);
    };
    const handleCancel = () => {
        setShowConfirmModal(false);
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'employeeId',
            key: 'name',
            render: (_, { employeeId }) => (
                <p key={employeeId._id}>{employeeId.name}</p>
            )
        },
        {
            title: 'Position',
            dataIndex: 'role',
            key: 'role',
            render: (_, record) => (
                <p key={`${record.role._id} + ${record.employeeId._id}`}>{record.role.name}</p>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space key={`button-${record.employeeId._id}`} size="middle">
                    <ButtonCommon buttonType="edit" handleOnClick={() => handleDetails(record)} />
                    <ButtonCommon buttonType="delete" handleOnClick={() => { setShowConfirmModal(true); setEmpId(record._id); }} />
                </Space>
            ),
        },
    ];

    return (
        <>
            <div style={{ marginBottom: "20px" }}>
                <h2>Employees in project</h2>
                {project.isActive ? 
                <ButtonCommon buttonType="add-button" handleOnClick={() => setAddEmployeeModal(true)} /> : 
                <p>This project is closed</p>
                }
            </div>
            <Table dataSource={filteredEmpInPro} columns={columns} />
            {empDetails && <EmployeeInProjectModal empDetails={empDetails} />}
            <ConfirmModal
                visible={showConfirmModal}
                handleOk={() => handleDelete(empId)}
                handleCancel={() => handleCancel()}
                title={"Confirm remove employee"}
                message={"Do you confirm to remove this employee from project?"}
            />
        </>
    );
};

export default EmployeeInProject;
