import { Navigate, Outlet, useNavigate } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import Employees from "../../pages/employee/employees";
import EmployeeDetails from "../../pages/employee/employeeDetails";
import { Layout } from "../../components/layout/Layout";
import { LOCAL_STORAGE_TOKEN_NAME } from "../../contexts/constants";
import Dashboard from "../../pages/dashboard/Dashboard";
import Projects from "../../pages/project/projects";
import AddProject from "../../pages/project/addProject";
import ProjectDetails from "../../pages/project/projectDetails";
import LogPage from "../../pages/log/logPage";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)) {
      return navigate("/login");
    }
  }, [navigate]);
  return <Outlet />;
};

const dashboardRouter = [
  {
    path: "",
    element: <Dashboard />,
  },
];

const employeeRouter = [
  {
    path: "employee",
    element: <Employees />,
  },
  {
    path: "employee/:employeeId",
    element: <EmployeeDetails />,
  },
];

const projectRouter = [
  {
    path: "project",
    element: <Projects />,
  },
  {
    path: "project/add",
    element: <AddProject />,
  },
  {
    path: "project/details/:projectId",
    element: <ProjectDetails />,
  },
];

const logRouter = [
  {
    path: "log",
    element: <LogPage />,
  },
];

const privateRouters = [
  {
    path: "",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <Layout />,
        children: [
          ...dashboardRouter,
          ...employeeRouter,
          ...projectRouter,
          ...logRouter,
        ],
      },
    ],
  },
];

export default privateRouters;
