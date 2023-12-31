/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Tag } from "antd";

import { ProjectContext } from "../../contexts/projectContext";

import ButtonCommon from "../buttons/ButtonCommon";

const ProjectCard = (project) => {
  const navigate = useNavigate();

  const projectInfo = project.project;
  const technicals = projectInfo.technical;

  const {
    projectState: { allEmployeesInProject },
  } = useContext(ProjectContext);

  const empInPro = allEmployeesInProject.filter(
    (emp) =>
      emp.isWorking === true &&
      emp.employeeId.isDelete === false &&
      emp.projectId._id === projectInfo._id
  );

  const handleDetails = (proId) => {
    navigate(`/project/details/${proId}`);
  };

  const body = (
    <>
      <div style={{ width: "100%", minWidth: "200px" }}>
        <Card
          key={projectInfo._id}
          style={{ border: "1.25px solid #c7c5c5", height: "400px" }}
        >
          <div style={{ height: "320px" }}>
            <Tag
              color={
                projectInfo.status === "Planning"
                  ? "blue"
                  : projectInfo.status === "Completed"
                  ? "green"
                  : projectInfo.status === "Closed"
                  ? "red"
                  : projectInfo.status === "Running"
                  ? "purple"
                  : ""
              }
            >
              {projectInfo.status}
            </Tag>
            <p style={{ marginTop: "10px", height: "60px", fontSize: "20px" }}><b>{projectInfo.name}</b></p>
            <div style={{ marginTop: "10px", display: "flex" }}>
              {empInPro.length > 0 ? (
                empInPro.slice(0, 3).map((emp) => (
                  <div
                    key={emp.employeeId._id}
                    style={{
                      borderRadius: "50%",
                      width: "30px",
                      overflow: "hidden",
                      marginRight: "2px",
                    }}
                  >
                    <img
                      src={emp.employeeId.image}
                      alt={`Image of ${emp.employeeId.name}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))
              ) : (
                <div style={{ height: "30px" }}><b>No employee</b></div>
              )}
              {empInPro.length > 3 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                    width: "30px",
                    overflow: "hidden",
                    backgroundColor: "#e3e3e3",
                    fontSize: "9px",
                  }}
                >
                  <b>+{empInPro.length - 3}</b>
                </div>
              )}
            </div>
            <p style={{ fontWeight: 500, marginBottom: 6, marginTop: "10px" }}>
              Start date:{" "}
              {new Date(projectInfo.startDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            {projectInfo.endDate ? (
              <p style={{ fontWeight: 500, marginBottom: 6 }}>
                End date:{" "}
                {new Date(projectInfo.endDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            ) : (
              <p></p>
            )}
            <div
              style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}
            >
              <p style={{ fontWeight: 500, marginBottom: 6, marginRight: 6 }}>
                Technical:{" "}
              </p>
              {technicals.map((tech) => (
                <div key={`${tech._id}-${projectInfo._id}`}>
                  <Tag>{tech.name}</Tag>
                </div>
              ))}
            </div>
          </div>
          <ButtonCommon
            buttonType="details"
            handleOnClick={() => handleDetails(projectInfo._id)}
          />
        </Card>
      </div>
    </>
  );
  return <>{body}</>;
};

export default ProjectCard;
