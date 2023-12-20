/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Spin, Row, Col } from "antd";

import { ProjectContext } from "../../contexts/projectContext";
import { ComponentsContext } from "../../contexts/componentsContext";

import Alert from "../../components/alerts/alertCommon";

import EmployeeInProject from "../../components/project/employeeInProject";
import AssignEmployeeModal from "../../components/project/assignEmployeeModal";
import ProjectForm from "../../components/project/projectForm";
import ProjectTimeline from "../../components/project/projectTimeline";

const ProjectDetails = () => {
  const { projectId } = useParams();

  const {
    projectState: { employeesInProject, isLoading, project },
    getEmployeesInProject,
    findProject,
  } = useContext(ProjectContext);

  const { alert } = useContext(ComponentsContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Project Details';
  }, [project]);

  useEffect(() => {
    findProject(projectId);
    getEmployeesInProject(projectId);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  let body = null;

  if (loading) {
    body = (
      <div className="spinner">
        <Spin size="large" />
      </div>
    );
  } else {
    body = (
      <>
        <Row gutter={{ xs: 8, sm: 12, md: 24, lg: 32 }}>
          <Col xs={24} sm={24} md={12} lg={12}>
            {project && <ProjectForm project={project} />}
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            {employeesInProject !== null && isLoading ? (
              <p>Đang tải...</p>
            ) : (
              <EmployeeInProject employeesInProject={employeesInProject} />
            )}
          </Col>
        </Row>
        <div>
          {employeesInProject !== null && isLoading ? (
            <p>Đang tải...</p>
          ) : (
            <ProjectTimeline employeesInProject={employeesInProject} />
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <Link to="/project">Back</Link>
      {body}
      {project && <AssignEmployeeModal project={project} />}
      {alert && <Alert />}
    </>
  );
};

export default ProjectDetails;
