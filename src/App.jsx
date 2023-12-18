import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';

import AuthContextProvider from './contexts/authContext';
import EmployeeContextProvider from "./contexts/employeeContext";
import TechnicalContextProvider from "./contexts/technicalContext";
import ComponentsContextProvider from "./contexts/componentsContext";
import LayoutContextProvider from "./contexts/LayoutContext";
import RecordContextProvider from './contexts/recordlogContext';
import ProjectContextProvider from './contexts/projectContext';
import RoleContextProvider from './contexts/roleContext';

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

import { useContext } from 'react';
import { AuthContext } from './contexts/authContext';

const ProtectedRoute = ({ element }) => {
   const { authState: { isAuthenticated } } = useContext(AuthContext);

   return isAuthenticated ? element : <Navigate to="/login" />;
};

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
                              <Routes>
                                 <Route path="login" element={<LoginPage />} />
                                 <Route path="/*" element={<PageNotFound />} />
                                 <Route path="/" element={<ProtectedRoute element={<Layout />} />} >
                                    <Route path="/" element={<Dashboard />} />
                                    <Route path="/employee" element={<Employees />} />
                                    <Route path="/employee/:employeeId" element={<EmployeeDetails />} />
                                    <Route path="/project" element={<Projects />} />
                                    <Route path="/addproject" element={<AddProject />} />
                                    <Route path="/project/:projectId" element={<ProjectDetails />} />
                                    <Route path="/log" element={<LogPage />} />
                                 </Route>
                              </Routes>
                           </RoleContextProvider>
                        </ProjectContextProvider>
                     </RecordContextProvider>
                  </TechnicalContextProvider>
               </EmployeeContextProvider>
               <Routes>
                  <Route path="/doesnt-exist" element={<PageNotFound/>} />
               </Routes>
            </ComponentsContextProvider>
         </LayoutContextProvider>
      </AuthContextProvider>
   );
}

export default App;