  import React, { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

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

  useEffect(() => {
    findProject(projectId);
    getEmployeesInProject(projectId);
  }, []);

  return (
    <>
      <Link to="/project">Back</Link>
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
      {project && <AssignEmployeeModal project={project} />}
      {alert && (
        <Alert />
      )}
    </>
  );
}

export default ProjectDetails;
