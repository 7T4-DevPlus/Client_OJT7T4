import { createContext, useReducer, useState, useContext } from "react";
import { projectReducer } from "../reducers/projectReducer"
import { apiUrl } from "./constants";
import axios from "axios";

import {ComponentsContext} from "./componentsContext";

export const ProjectContext = createContext();

const ProjectContextProvider = ({ children }) => { 
    const [projectState, dispatch] = useReducer(projectReducer, {
        project: null,
        projects: [],
        employeesInProject: [],
        allEmployeesInProject: [],
        isLoading: true
    });

    const {
        setProcessing,
        setAlert,
        setAlertMessage,
        setAlertType,
    } = useContext(ComponentsContext);

    const [addEmployeeModal, setAddEmployeeModal] = useState(false);
    const [employeeDetailsModal, setEmployeeDetailsModal] = useState(false);

    const getProjects = async () => {
        try {
            const response = await axios.get(`${apiUrl}/projects`)
            if (response.status === 200) {
                dispatch({ type: 'PRO_LOADED_SUCCESS', payload: response.data.projects });
            }
        } catch (error) {
            console.log(error);
            dispatch({ type: 'PRO_LOADED_FAIL' });
        }
    }

    const findProject = projectId => {
		const project = projectState.projects.find(pro => pro._id === projectId)
		dispatch({ type: 'FIND_PRO', payload: project })
	}

    const createProject = async newProject => {
        try {
            const response = await axios.post(`${apiUrl}/projects/create`, newProject)
            if (response.data.success) {
                dispatch({type: 'PRO_CREATED_SUCCESS', payload: response.data.projects})
                setTimeout(() => {
                    setProcessing(false);
                    setAlert(true);
                    setAlertMessage(response.data.message);
                    setAlertType("success");
                }, 2000);  
                return response.data
            }
            setTimeout(() => {
                setProcessing(false);
                setAlert(true);
                setAlertMessage(response.data.message);
                setAlertType("error");
            }, 2000); 
        } catch (error) {
            setTimeout(() => {
                setProcessing(false);
                setAlert(true);
                setAlertMessage(error.response.data.message);
                setAlertType("error");
            }, 2000);
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    }

    const closeProject = async projectId => {
		try {
			const response = await axios.patch(`${apiUrl}/projects/close/${projectId}`)
			if (response.data.success){
				dispatch({ type: 'CLOSE_PROJECT' });
                setAlert(true);
                setAlertMessage(response.data.message);
                setAlertType("success");
            }
            setTimeout(() => {
                setProcessing(false);
                setAlert(true);
                setAlertMessage(response.data.message);
                setAlertType("error");
            }, 2000);
		} catch (error) {
			console.log(error);
            setAlert(true);
            setAlertMessage(error.response.data.message);
            setAlertType("error");
		}
	}

	const updateProject = async (updatedProject, projectId) => {
		try {
			const response = await axios.patch(`${apiUrl}/projects/update/${projectId}`, updatedProject)
			if (response.data.success) {
				dispatch({ type: 'UPDATE_PRO', payload: response.data.project })
				setTimeout(() => {
                    setProcessing(false);
                    setAlert(true);
                    setAlertMessage(response.data.message);
                    setAlertType("success");
                }, 2000);
                return response.data
			}
            setTimeout(() => {
                setProcessing(false);
                setAlert(true);
                setAlertMessage(response.data.message);
                setAlertType("error");
            }, 2000);
		} catch (error) {
            setTimeout(() => {
                setProcessing(false);
                setAlert(true);
                setAlertMessage(error.response.data.message);
                setAlertType("error");
            }, 2000);
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

    const getProjectById = async (projectId) => {
        try {
            const response = await axios.get(`${apiUrl}/projects/${projectId}`);
            if (response.status === 200) {
                dispatch({ type: 'PRODETAILS_LOADED_SUCCESS', payload: response.data });
            }
        } catch (error) {
            console.log(error);
            dispatch({ type: 'PRODETAILS_LOADED_FAIL' });
        }
    }

    const getEmployeesInProject = async (projectId) => {
        try {
            const response = await axios.get(`${apiUrl}/projects/getEmployees/${projectId}`);
            if (response.status === 200) {
                dispatch({ type: 'EMPINPRO_LOADED_SUCCESS', payload: response.data.employees });
            }
        }catch (error) {
            console.log(error);
            dispatch({ type: 'EMPINPRO_LOADED_FAIL' });
        }
    }

    const getAllEmployees = async () => {
        try {
            const response = await axios.get(`${apiUrl}/empinpro`)
            if (response.status === 200) {
                dispatch({ type: 'ALLEMPINPRO_LOADED_SUCCESS', payload: response.data.employees });
            }
        } catch (error) {
            console.log(error);
            dispatch({ type: 'ALLEMPINPRO_LOADED_FAIL' });
        }
    }

    const addEmployeeToProject = async employee => {
        try {
            const response = await axios.post(`${apiUrl}/projects/addemp`, employee);
            if (response.data.success) {
                dispatch({type: 'EMP_ADDED_SUCCESS', payload: response.data.employees})
                setTimeout(() => {
                    setProcessing(false);
                    setAlert(true);
                    setAlertMessage(response.data.message);
                    setAlertType("success");
                }, 2000);
                return response.data
            }
            setTimeout(() => {
                setProcessing(false);
                setAlert(true);
                setAlertMessage(response.data.message);
                setAlertType("error");
            }, 2000);
        } catch (error) {
            setTimeout(() => {
                setProcessing(false);
                setAlert(true);
                setAlertMessage(error.response.data.message);
                setAlertType("success");
            }, 2000);
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    }

    const removeEmployeeFromProject = async employeeInProjectId => {
        try {
            const response = await axios.patch(`${apiUrl}/projects/removeemp/${employeeInProjectId}`)
            if (response.data.success) {
                dispatch({ type: 'REMOVED_EMP' });
                setTimeout(() => {
                    setProcessing(false);
                    setAlert(true);
                    setAlertMessage(response.data.message);
                    setAlertType("success");
                }, 2000);
            }
            setTimeout(() => {
                setProcessing(false);
                setAlert(true);
                setAlertMessage(response.data.message);
                setAlertType("error");
            }, 2000);
        } catch (error) {
            console.log(error);
            setTimeout(() => {
                setProcessing(false);
                setAlert(true);
                setAlertMessage(error.response.data.message);
                setAlertType("success");
            }, 2000);
		}
	}

    const projectContextData = {
        projectState,
        getProjects,
        findProject,
        createProject,
        closeProject,
        updateProject,
        getProjectById,
        getEmployeesInProject,
        getAllEmployees,
        addEmployeeToProject,
        removeEmployeeFromProject,
        addEmployeeModal,
        setAddEmployeeModal,
        employeeDetailsModal,
        setEmployeeDetailsModal,
    }

   return (
      <ProjectContext.Provider value={projectContextData}>
        {children}
    </ProjectContext.Provider>
   );
};

export default ProjectContextProvider;
