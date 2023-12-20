import "./App.css";
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

function App() {
  return (
    <ComponentsContextProvider>
      <AuthContextProvider>
        <LayoutContextProvider>
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
        </LayoutContextProvider>
      </AuthContextProvider>
    </ComponentsContextProvider>
  );
}

export default App;
