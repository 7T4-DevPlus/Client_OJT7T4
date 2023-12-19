import React, { useContext, useEffect } from 'react';

import { Col, Row, Spin } from 'antd';

import { ProjectContext } from '../../contexts/projectContext';
import { ComponentsContext } from '../../contexts/componentsContext';

import ProjectCard from '../../components/project/projectCard';
import Alert from '../../components/alerts/alertCommon';

const Projects = () => {

  const {
    getProjects,
    projectState: { projects, isLoading },
    getAllEmployees,
    searchProject,
    searchProjectByName
  } = useContext(ProjectContext);

  const {
    alert,
    setSearchType
  } = useContext(ComponentsContext);

  useEffect(() => {
    setSearchType("project");
    getAllEmployees();
    if (searchProject === "") {
      getProjects();
    } else {
      searchProjectByName(searchProject);
    }
  }, [searchProject]);

  let projectCards = null;
  if (isLoading) {
    projectCards = (
      <div className="spinner">
        <Spin size="large" />
      </div>
    )
  } else {
    projectCards = (
      <Row gutter={{ xs: 8, sm: 12, md: 24, lg: 32, }}>
        {projects && projects.map(project => (
          <Col xs={24} sm={12} md={12} lg={8} key={project._id} style={{ marginBottom: "20px", paddingRight: 0 }}>
            <ProjectCard project={project} />
          </Col>
        ))}
      </Row>
    )
  }

  return (
    <>
      {projectCards}
      {alert && (
        <Alert />
      )}
    </>
  );
};

export default Projects
