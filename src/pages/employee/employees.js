import React, { useContext, useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EmployeeContext } from '../../contexts/employeeContext';
import { Button, Input, Space, Table, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ButtonCommon from '../../components/buttons/ButtonCommon';

import AddModal from '../../components/employee/addEmployeeModal';

const Employees = () => {
    const navigate = useNavigate();
    const {
        setShowModal,
        getEmployee,
        employeeState: { employees },
        deleteEmployee,
    } = useContext(EmployeeContext);

    const handleDetails = (record) => {
        navigate(`/employee/${record._id}`);
    };

    useEffect(() => {
        getEmployee();
    }, []);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters, confirm) => {
        clearFilters();
        setSearchText('');
        confirm();
    };

    const handleDelete = (empId) => {
        deleteEmployee(empId);
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search employees`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters, confirm)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) => {
            const name = record['name'] ? record['name'].toString().toLowerCase() : '';
            const email = record['email'] ? record['email'].toString().toLowerCase() : '';
            return name.includes(value.toLowerCase()) || email.includes(value.toLowerCase());
        },
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) => text,
    });

    const columns = [
        {
            title: 'Full name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps(),
            render: (text, record) => (
                <Link to={`/profile/${record._id}`}>
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
            filters: [
                {
                    text: 'Java',
                    value: 'Java',
                },
                {
                    text: 'Javascript',
                    value: 'Javascript',
                },
                {
                    text: 'PHP',
                    value: 'PHP',
                },
                {
                    text: 'Python',
                    value: 'Python',
                },
                {
                    text: 'ReactJS',
                    value: 'ReactJs',
                },
                {
                    text: 'Html',
                    value: 'HTML',
                },
                {
                    text: 'Css',
                    value: 'CSS',
                },
                {
                    text: 'NodeJs',
                    value: 'NodeJs',
                }
            ],
            onFilter: (value, record) => record.technical.some(tech => tech.name.toLowerCase() === value.toLowerCase()),
            width: 335,
            render: (_, { technical }) => (
                <>
                    {technical.map((tech) => {
                        let techName = tech.name;
                        let color;
                        switch (techName.toLowerCase()) {
                            case 'java':
                                color = 'geekblue';
                                break;
                            case 'javascript':
                                color = 'gold';
                                break;
                            case 'php':
                                color = 'purple';
                                break;
                            case 'python':
                                color = 'green';
                                break;
                            case 'reactjs':
                                color = 'cyan';
                                break;
                            case 'html':
                                color = 'magenta';
                                break;
                            case 'css':
                                color = 'Gray';
                                break;
                            case 'nodejs':
                                color = 'lime';
                                break;
                            default:
                                color = 'red';
                        }

                        return (
                            <Tag color={color} key={techName}>
                                {techName.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
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
                    <ButtonCommon buttonType="delete" handleOnClick={() => handleDelete(record._id)} />
                </Space>
            ),
        },
    ];

    return (
        <>
            <Button type="primary" style={{ float: 'right', marginRight: '10px', borderRadius: '8px' }} onClick={() => setShowModal(true)}>
                Add Employee
            </Button>
            <Table columns={columns} dataSource={employees} pagination={{ pageSize: 6 }} rowKey="_id" />
            <AddModal />
        </>
    );
};

export default Employees;