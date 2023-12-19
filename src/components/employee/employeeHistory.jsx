import React from 'react'
import { Row, Col, Empty } from 'antd';
import HistoryCard from './historyCard'

const EmployeeHistory = (histories) => {
  const employeeHistories = histories.histories
  let body = null;
  if (employeeHistories.length != 0) {
    body = (
      <>
        <Row gutter={{ xs: 8, sm: 12, md: 24, lg: 32, }}>
          {employeeHistories && employeeHistories.map(history => (
            <Col xs={24} sm={12} md={12} lg={8} key={history._id}>
              <HistoryCard history={history} />
            </Col>
          ))}
        </Row>
      </>
    )
  } else {
    body = (
      <>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </>
    )
  }
  return (
    <>
      {body}
    </>
  )
}

export default EmployeeHistory
