import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Spin } from 'antd';

import { ProjectContext } from '../../contexts/projectContext';
import { ComponentsContext } from '../../contexts/componentsContext';

import ButtonCommon from '../../components/buttons/ButtonCommon';
import Alert from '../../components/alerts/alertCommon';

import EmployeeInProject from '../../components/project/employeeInProject';
import AssignEmployeeModal from '../../components/project/assignEmployeeModal';
import ProjectForm from '../../components/project/projectForm';
import ProjectTimeline from '../../components/project/projectTimeline';

const ProjectDetails = () => {
  const { projectId } = useParams();

  const {
    projectState: { employeesInProject, isLoading, project },
    getEmployeesInProject,
    setAddEmployeeModal,
    findProject
  } = useContext(ProjectContext);

  const {
    alert
  } = useContext(ComponentsContext);

  const [loading, setLoading] = useState(true);

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
        <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
          <div style={{ width: "45%" }}>
            {project && <ProjectForm project={project} />}
          </div>
          <div style={{ width: "45%" }}>
            <ButtonCommon buttonType="add" handleOnClick={() => setAddEmployeeModal(true)}>
              Add Employee
            </ButtonCommon>
            {employeesInProject !== null && isLoading ? <p>Đang tải...</p> : <EmployeeInProject employeesInProject={employeesInProject} />}
          </div>
        </div>
        <div>
          {employeesInProject !== null && isLoading ? <p>Đang tải...</p> : <ProjectTimeline employeesInProject={employeesInProject} />}
        </div>
      </>
    )
  }

  return (
    <>
      <Link to="/project">Back</Link>
      {body}
      {project && <AssignEmployeeModal project={project} />}
      {alert && (
        <Alert />
      )}
    </>
  );
}

export default ProjectDetails;
