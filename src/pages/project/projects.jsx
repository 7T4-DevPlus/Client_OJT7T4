import React, { useContext, useEffect } from 'react';

import { Col, Row, Spin } from 'antd';

import { ProjectContext } from '../../contexts/projectContext';
import { ComponentsContext } from '../../contexts/componentsContext';

import ProjectCard from '../../components/project/projectCard';
import Alert from '../../components/alerts/alertCommon';

const Projects = () => {

  const {
    getProjects,
    projectState: { projects, isLoading }
  } = useContext(ProjectContext);

  const {
    alert
  } = useContext(ComponentsContext);

  useEffect(() => {
    getProjects();
  }, []);

  let projectCards = null;
  if (isLoading) {
    projectCards = (
      <div className="spinner">
        <Spin size="large" />
      </div>
    )
  } else {
    projectCards = (
        <Row gutter={{xs: 8,sm: 16,md: 24,lg: 32,}}>
          {projects && projects.map(project => (
            <Col xs={24} sm={12} md={8} lg={6} key={project._id} style={{ marginBottom: "20px" }}>
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
