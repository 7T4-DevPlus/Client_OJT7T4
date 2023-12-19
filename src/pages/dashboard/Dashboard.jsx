/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";

import { EmployeeContext } from "../../contexts/employeeContext";
import { ProjectContext } from "../../contexts/projectContext";

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

  useEffect(() => {
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

      // Tính toán ngày 5 tháng trước
      let fiveMonthsAgo = moment().subtract(5, "months");

      // Lọc các dự án trong khoảng thời gian từ fiveMonthsAgo đến ngày hiện tại
      let filteredProjects = projects.filter((project) => {
        let projectStartDate = moment(project.startDate);
        return projectStartDate.isBetween(
          fiveMonthsAgo,
          currentDate,
          null,
          "[]"
        );
      });

      console.log(filteredProjects);

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
    labels: Object.keys(projectsByMonth),
    datasets: [
      {
        label: "Projects per Month",
        data: Object.values(projectsByMonth),
        backgroundColor: "rgba(75,85,192,0.6)",
        borderColor: "rgba(75,85,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        min: 0,
        stepSize: 0.2,
      },
    },
  };

  const pieChartData = {
    labels: Object.keys(employeeTechnicalData),
    datasets: [
      {
        data: Object.values(employeeTechnicalData),
        backgroundColor: [
          "rgba(153, 188, 87, 1)",
          "rgba(237, 153, 91, 1)",
          "rgba(244, 207, 121, 1)",
          "rgba(115, 164, 202, 1)",
          "rgba(232, 226, 214, 1)",
          "rgba(124, 155, 71, 1)",
          "rgba(137, 160, 158, 1)",
          "rgba(203, 79, 80, 1)",
          "rgba(106, 174, 214, 1)",
          "rgba(134, 131, 189, 1)",
        ],
        borderColor: "rgba(255,255,255,1)",
        borderWidth: 1,
      },
    ],
  };

  const squareContainerStyle = {
    display: "flex",
    marginBottom: "20px",
  };

  const squareStyle = {
    flex: 1,
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    margin: "13px",
    position: "relative",
    overflow: "hidden",
  };

  const chartBlockStyle = {
    ...squareStyle,
    marginRight: "10px",
    marginBottom: "20px",
    height: "500px",
    width: "calc(50% - 10px)",
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
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <div style={squareStyle} className="squareBlock">
          <img
            src="https://res.cloudinary.com/dokzmffiv/image/upload/v1702871920/OJT/multiple-users-silhouette_gs6cob.png"
            alt="Employee"
            style={imageStyle}
          />
          <div style={{ marginTop: "1.5vh", marginBottom: "1vh" }}>
            <div style={{ fontSize: "20px" }}>
              <b>{totalEmployees}</b>
            </div>
            <div>Total Employees</div>
          </div>
        </div>

        <div style={squareStyle} className="squareBlock">
          <img
            src="https://res.cloudinary.com/dokzmffiv/image/upload/v1702872434/OJT/to-do-list_odrvuq.png"
            alt="Project"
            style={imageStyle}
          />
          <div style={{ marginTop: "1.5vh", marginBottom: "1vh" }}>
            <div style={{ fontSize: "20px" }}>
              <b>{totalProjects}</b>
            </div>
            <div>Total Projects</div>
          </div>
        </div>

        <div style={squareStyle} className="squareBlock">
          <img
            src="https://res.cloudinary.com/dokzmffiv/image/upload/v1702873301/OJT/team_1_uplln0.png"
            alt="Client"
            style={imageStyle}
          />
          <div style={{ marginTop: "1.5vh", marginBottom: "1vh" }}>
            <div style={{ fontSize: "20px" }}>
              <b>{totalCLient}</b>
            </div>
            <div>Total Clients</div>
          </div>
        </div>

        <div style={squareStyle} className="squareBlock">
          <img
            src="https://res.cloudinary.com/dokzmffiv/image/upload/v1702873059/OJT/collaboration_uxughb.png"
            alt="Team"
            style={imageStyle}
          />
          <div style={{ marginTop: "1.5vh", marginBottom: "1vh" }}>
            <div style={{ fontSize: "20px" }}>
              <b>{totalTeams}</b>
            </div>
            <div>Total Teams</div>
          </div>
        </div>
      </div>

      <div style={squareContainerStyle}>
        <div style={chartBlockStyle}>
          <h2 key="bar-chart-title">Projects Per Month</h2>
          <Bar
            key={`bar-chart-${totalEmployees}`}
            data={barChartData}
            options={barChartOptions}
          />
        </div>

        <div style={chartBlockStyle}>
          <div style={chartContainerStyle}>
            <h2 key="pie-chart-title">Employee Technical Skills</h2>
            <Pie
              key={`pie-chart-${totalEmployees}`}
              data={pieChartData}
              style={{ marginLeft: "11vh" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
