import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Space, Table, Tag, Spin } from 'antd';

import { ComponentsContext } from '../../contexts/componentsContext';
import { EmployeeContext } from '../../contexts/employeeContext';
import { TechnicalContext } from '../../contexts/technicalContext';

import ButtonCommon from '../../components/buttons/ButtonCommon';
import AddModal from '../../components/employee/addEmployeeModal';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import Alert from '../../components/alerts/alertCommon'

const Employees = () => {
    const navigate = useNavigate();
    const {
        setShowModal,
        getEmployee,
        employeeState: { employees, isLoading },
        deleteEmployee,
        searchEmployee,
        searchString,
        findEmployee
    } = useContext(EmployeeContext);

    const {
        technicalState: { technicals },
        getTechnicals
    } = useContext(TechnicalContext);

    const {
        alert
    } = useContext(ComponentsContext);

    const handleDetails = (record) => {
        findEmployee(record._id);
        navigate(`/employee/${record._id}`);
    };

    useEffect(() => {
        if (searchString === '') {
            getEmployee();
        } else {
            console.log(searchString);
            searchEmployee(searchString);
        }
    }, [searchString]);

    useEffect(() => {
        getTechnicals();
    }, []);

    const techFilters = technicals.map(({ _id, name }) => ({
        text: name,
        value: name,
    }));

    const sortTechnicalsByPoint = (technicals) => {
        return technicals.sort((a, b) => b.point - a.point);
    };

    const [empId, setEmpId] = useState('');

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const handleDelete = (empId) => {
        deleteEmployee(empId);
        setShowConfirmModal(false);
    };
    
    const handleCancel = () => {
        setShowConfirmModal(false);
      }

    const columns = [
        {
            title: 'Full name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Link to={`/employee/${record._id}`} onClick={() => handleDetails(record)}>
                    {text}
                </Link>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Employee Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Technical',
            key: 'technical',
            dataIndex: 'technical',
            filters: techFilters,
            onFilter: (value, record) => {
                const selectedTechs = Array.isArray(value) ? value : [value];
                
                return selectedTechs.every(selectedTech =>
                    record.technical.some(tech =>
                        tech.technicalId.name.toLowerCase() === selectedTech.toLowerCase()
                    )
                );
            },
            width: 335,
            render: (_, { technical }) => {
                const sortedTechnicals = sortTechnicalsByPoint(technical);
                const top3Technicals = sortedTechnicals.slice(0, 3);
                return (
                    <>
                        {top3Technicals.map((tech) => {
                            let techName = tech.technicalId.name;
                            let techPoint = tech.point;
                            return (
                                <Tag color={'blue'} key={techName}>
                                    {techName}-{techPoint}
                                </Tag>
                            );
                        })}
                    </>
                );
            },
        },
        {
            title: 'Availability',
            dataIndex: 'isAvailable',
            key: 'isAvailable',
            render: (isAvailable) => (
                <Tag color={isAvailable ? 'green' : 'red'}>
                    {isAvailable ? 'Available' : 'Unavailable'}
                </Tag>
            ),
            sorter: (a, b) => a.isAvailable - b.isAvailable,
            filters: [
                {
                    text: 'Available',
                    value: 'true',
                },
                {
                    text: 'Unavailable',
                    value: 'false',
                },
            ],
            onFilter: (value, record) => record.isAvailable.toString() === value,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <ButtonCommon buttonType="edit" handleOnClick={() => handleDetails(record)} />
                    <ButtonCommon buttonType="delete" handleOnClick={() => { setShowConfirmModal(true); setEmpId(record._id); }} />
                </Space>
            ),
        },
    ];

    let body = null;
    if (isLoading) {
        body = (
            <div className="spinner">
                <Spin size="large" />
            </div>
        )
    } else {
        body = (
            <Table columns={columns} dataSource={employees} pagination={{ pageSize: 6 }} rowKey="_id" />
        )
    }

    return (
        <>
            <ButtonCommon buttonType="add-button" handleOnClick={() => setShowModal(true)} />
            {body}
            <AddModal />
            <ConfirmModal
                visible={showConfirmModal}
                handleOk={() => handleDelete(empId)}
                handleCancel={() => handleCancel()}
                title={"Confirm delete employee"}
                message={"Do you confirm to delete this employee?"}
            />
            {alert && (
                <Alert />
            )}
        </>
    );
};

export default Employees;
