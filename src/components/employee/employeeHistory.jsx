import React from 'react'
import { Row, Empty } from 'antd';
import HistoryCard from './historyCard'

const EmployeeHistory = (histories) => {
  const employeeHistories = histories.histories
  let body = null;
  if (employeeHistories.length !== 0) {
    body = (
      <>
        <div style={{ width: "80%", marginLeft: "10%" }}>
          {employeeHistories &&
            employeeHistories.map((history) => (
              <Row gutter={16} key={history._id}>
                <HistoryCard history={history} />
              </Row>
            ))}
        </div>
      </>
    );
  } else {
    body = (
      <>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </>
    );
  }
  return (
    <>
      { body }
    </>
  )
}

export default EmployeeHistory
