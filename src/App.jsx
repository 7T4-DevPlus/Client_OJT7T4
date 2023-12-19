import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";

import AuthContextProvider from "./contexts/authContext";
import EmployeeContextProvider from "./contexts/employeeContext";
import TechnicalContextProvider from "./contexts/technicalContext";
import ComponentsContextProvider from "./contexts/componentsContext";
import LayoutContextProvider from "./contexts/LayoutContext";
import RecordContextProvider from "./contexts/recordlogContext";
import ProjectContextProvider from "./contexts/projectContext";
import RoleContextProvider from "./contexts/roleContext";

import { Layout } from "./components/layout/Layout";
import { Dashboard } from "./pages/dashboard/Dashboard";
import Employees from "./pages/employee/employees";
import EmployeeDetails from "./pages/employee/employeeDetails";
import LogPage from "./pages/log/logPage";
import LoginPage from "./pages/login/loginPage";
import Projects from "./pages/project/projects";
import ProjectDetails from "./pages/project/projectDetails";
import AddProject from "./pages/project/addProject";
import PageNotFound from "./pages/404notfound/PagenotFound";

import { Suspense, useContext } from "react";
import { AuthContext } from "./contexts/authContext";
import Routers from "./router";
import UserProvider from "./contexts/userContext/userProvider";
import UserProviderContext from "./contexts/userContext/userProvider";

// const ProtectedRoute = ({ element }) => {
//   const {
//     authState: { isAuthenticated },
//   } = useContext(AuthContext);

//   return isAuthenticated ? element : <Navigate to="/login" />;
// };

function App() {
  return (
    <AuthContextProvider>
      <LayoutContextProvider>
        <ComponentsContextProvider>
          <EmployeeContextProvider>
            <TechnicalContextProvider>
              <RecordContextProvider>
                <ProjectContextProvider>
                  <RoleContextProvider>
                    <UserProviderContext>
                      <Routers />
                    </UserProviderContext>
                  </RoleContextProvider>
                </ProjectContextProvider>
              </RecordContextProvider>
            </TechnicalContextProvider>
          </EmployeeContextProvider>
        </ComponentsContextProvider>
      </LayoutContextProvider>
    </AuthContextProvider>
  );
}

export default App;
