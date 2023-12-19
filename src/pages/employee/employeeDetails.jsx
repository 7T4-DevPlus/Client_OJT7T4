/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { EmployeeContext } from "../../contexts/employeeContext";
import { ComponentsContext } from "../../contexts/componentsContext";

import EmployeeForm from "../../components/employee/employeeForm";
import EmployeeHistory from "../../components/employee/employeeHistory";

import Alert from "../../components/alerts/alertCommon";
import { Tabs } from "antd";

const EmployeeDetails = () => {
  const {
    employeeState: { employee, histories },
    getEmployeeById,
    getEmployeeHistories,
  } = useContext(EmployeeContext);
  const { employeeId } = useParams();

  useEffect(() => {
    getEmployeeById(employeeId);
    getEmployeeHistories(employeeId);
  }, []);

  const [content, setContent] = useState("details");

  const { alert } = useContext(ComponentsContext);

  const onChange = (key) => {
    setContent(key);
  };

  const items = [
    {
      key: "details",
      label: "Information",
    },
    {
      key: "history",
      label: "History",
    },
  ];

  let contentItem = null;
  if (content === "details") {
    contentItem = (
      <>
        {employee !== null && (
          <EmployeeForm employee={employee} employeeId={employeeId} />
        )}
      </>
    );
  } else {
    contentItem = (
      <>{histories !== null && <EmployeeHistory histories={histories} />}</>
    );
  }

  return (
    <>
      <div>
        <Link to="/employee">Back</Link>
      </div>
      <div style={{ width: "100%" }}>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        {contentItem}
      </div>
      {alert && <Alert />}
    </>
  );
};

export default EmployeeDetails;
