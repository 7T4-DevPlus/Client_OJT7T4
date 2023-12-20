/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import Alert from "../../components/alerts/alertCommon";
import { Col, Row } from 'antd';

import { EmployeeContext } from "../../contexts/employeeContext";
import { ProjectContext } from "../../contexts/projectContext";
import { ComponentsContext } from "../../contexts/componentsContext";

const Dashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalCLient, setTotalClient] = useState("");
  const [totalTeams, setTotalTeams] = useState(0);
  const [projectsByMonth, setProjectsByMonth] = useState({});
  const [employeeTechnicalData, setEmployeeTechnicalData] = useState({});

  const {
    employeeState: { employees },
    getEmployee,
  } = useContext(EmployeeContext);

  const {
    projectState: { projects },
    getProjects,
  } = useContext(ProjectContext);

  const { alert } = useContext(ComponentsContext);

  useEffect(() => {
    document.title = 'Dashboard';
    
    getEmployee();
    getProjects();
  }, []);

  useEffect(() => {
    if (employees) {
      const totalEmployees = employees.length;
      setTotalEmployees(totalEmployees);
    }

    if (projects) {
      const totalProjects = projects.length;
      setTotalProjects(totalProjects);

      const simulatedData = {
        totalClient: 50,
        totalTeams: 12,
      };
      setTotalClient(simulatedData.totalClient);
      setTotalTeams(simulatedData.totalTeams);

      const currentDate = moment().format("YYYY-MM-DD");

      let fiveMonthsAgo = moment().subtract(5, "months");

      let filteredProjects = projects.filter((project) => {
        let projectStartDate = moment(project.startDate);
        return projectStartDate.isBetween(
          fiveMonthsAgo,
          currentDate,
          null,
          "[]"
        );
      });

      const projectsByMonthData = countProjectsByMonth(filteredProjects);
      setProjectsByMonth(projectsByMonthData);

      const employeeTechnicalData = countEmployeesByTechnical(employees);
      setEmployeeTechnicalData(employeeTechnicalData);
    }
  }, [employees, projects]);

  const countProjectsByMonth = (projects) => {
    const projectsByMonthData = {};

    projects.forEach((project) => {
      const monthKey = moment(project.startDate).format("MMM YYYY");
      if (projectsByMonthData[monthKey]) {
        projectsByMonthData[monthKey]++;
      } else {
        projectsByMonthData[monthKey] = 1;
      }
    });

    return projectsByMonthData;
  };

  const countEmployeesByTechnical = (employees) => {
    const employeeTechnicalData = {};

    employees.forEach((employee) => {
      const { technical } = employee;
      technical.forEach((tech) => {
        const techName = tech.technicalId.name;
        if (employeeTechnicalData[techName]) {
          employeeTechnicalData[techName]++;
        } else {
          employeeTechnicalData[techName] = 1;
        }
      });
    });

    return employeeTechnicalData;
  };

  const barChartData = {
    labels: Object.keys(employeeTechnicalData),
    datasets: [
      {
        label: "Employees per Technical Skill",
        data: Object.values(employeeTechnicalData),
        backgroundColor: "rgba(75,85,192,0.6)",
        borderColor: "rgba(75,85,192,1)",
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  };

  const barChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        stepSize: 0.5,
      },
    },
  };

  const pieChartData = {
    labels: Object.keys(projectsByMonth),
    datasets: [
      {
        data: Object.values(projectsByMonth),
        backgroundColor: [
          "rgba(153, 188, 87, 1)",
          "rgba(237, 153, 91, 1)",
          "rgba(244, 207, 121, 1)",
          "rgba(95, 183, 212, 1)",
          "rgba(232, 226, 214, 1)",
        ],
        borderColor: "rgba(255,255,255,1)",
        borderWidth: 1,
      },
    ],
  };

  const squareStyle = {
    flex: 1,
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "8px",
    position: "relative",
    overflow: "hidden",
    width: '100%',
    height: '15vh',
    marginBottom: '10px'
  };

  const chartBlockStyle = {
    ...squareStyle,
    height: '70vh',
    width: '100%',
  };

  const chartContainerStyle = {
    position: "absolute",
    top: "45%",
    left: "43%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80%",
  };

  const imageStyle = {
    width: "70px",
    height: "70px",
    marginRight: "20px",
  };

  return (
    <>
      <div style={{ padding: '20px' }}>
        <Row gutter={{ xs: 8, sm: 12, md: 24, lg: 24, }} style={{ marginBottom: "20px" }}>
          <Col xs={24} sm={12} md={6} lg={6}>
            <div style={squareStyle} className='squareBlock'>
              <img src="https://res.cloudinary.com/dokzmffiv/image/upload/v1702871920/OJT/multiple-users-silhouette_gs6cob.png" alt="Employee" style={imageStyle} />
              <div>
                <b>{totalEmployees}</b>
                <p>Total Employees</p>
              </div>
            </div>
          </Col>

          <Col xs={24} sm={12} md={6} lg={6}>
            <div style={squareStyle} className='squareBlock'>
              <img src="https://res.cloudinary.com/dokzmffiv/image/upload/v1702872434/OJT/to-do-list_odrvuq.png" alt="Project" style={imageStyle} />
              <div>
                <b>{totalProjects}</b>
                <p>Total Projects</p>
              </div>
            </div>
          </Col>

          <Col xs={24} sm={12} md={6} lg={6}>
            <div style={squareStyle} className='squareBlock'>
              <img src="https://res.cloudinary.com/dokzmffiv/image/upload/v1702873301/OJT/team_1_uplln0.png" alt="Client" style={imageStyle} />
              <div>
                <b>{totalCLient}</b>
                <p>Total Clients</p>
              </div>
            </div>
          </Col>

          <Col xs={24} sm={12} md={6} lg={6}>
            <div style={squareStyle} className='squareBlock'>
              <img src="https://res.cloudinary.com/dokzmffiv/image/upload/v1702873059/OJT/collaboration_uxughb.png" alt="Team" style={imageStyle} />
              <div>
                <b>{totalTeams}</b>
                <p>Total Teams</p>
              </div>
            </div>
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 12, md: 24, lg: 32, }}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div style={chartBlockStyle}>
              <h2 key="bar-chart-title">Projects Per Month</h2>
              <Bar key={`bar-chart-${totalEmployees}`} data={barChartData} options={barChartOptions} style={{ marginTop: '8vh' }} />
            </div>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <div style={chartBlockStyle}>
              <div style={chartContainerStyle}>
                <h2 key="pie-chart-title">Employee Technical Skills</h2>
                <Pie key={`pie-chart-${totalEmployees}`} data={pieChartData} style={{ marginLeft: '11vh' }} />
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {alert && (
        <Alert />
      )}
    </>
  );
};

export default Dashboard;
