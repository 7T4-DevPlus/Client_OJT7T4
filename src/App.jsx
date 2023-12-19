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

import Routers from "./router";
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
                      {/* <Routes>
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
                                    <Route path="/doesnt-exist" element={<PageNotFound/>} />

                                 </Route>

                              </Routes> */}
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
