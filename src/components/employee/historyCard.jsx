import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, Tag } from 'antd';
import ButtonCommon from '../buttons/ButtonCommon';
import { format } from 'date-fns';

const HistoryCard = (history) => {
    const navigate = useNavigate();
    const employeeHistory = history.history;

    const handleDetails = (projectId) => {
        navigate(`/project/details/${projectId}`);
    };

    return (
        <>
            <Card
                style={{ marginBottom: "20px", borderRadius: "10px", boxShadow: "5px 10px 20px" }}
                title={employeeHistory.projectId.name}
                extra={
                    <Tag color={employeeHistory.isWorking ? 'green' : 'red'}>
                        {employeeHistory.isWorking ? 'Working' : 'Outed'}
                    </Tag>
                }
            >
                <p>Position: {employeeHistory.role.name}</p>
                <p>Description: {employeeHistory.description}</p>
                <br />
                <p>Join: {format(new Date(employeeHistory.joinDate), 'yyyy-MM-dd')}</p>
                <p>Out: {employeeHistory.outDate ? format(new Date(employeeHistory.outDate), 'yyyy-MM-dd') : "On working"}</p>
                <ButtonCommon buttonType="details" handleOnClick={() => handleDetails(employeeHistory.projectId._id)} />
            </Card>
        </>
    )
}

export default HistoryCard
