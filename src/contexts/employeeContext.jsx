import { createContext, useReducer, useState, useContext } from "react";
import { employeeReducer } from "../reducers/employeeReducer"
import { apiUrl } from "./constants";
import axios from "axios";
import unorm from 'unorm';

import { ComponentsContext } from "./componentsContext";

export const EmployeeContext = createContext()

const EmployeeContextProvider = ({ children }) => {
    const [employeeState, dispatch] = useReducer(employeeReducer, {
        employee: null,
        employees: [],
        isLoading: true
    });

    const {
        setProcessing,
        setAlert,
        setAlertMessage,
        setAlertType,
    } = useContext(ComponentsContext);

    const [showModal, setShowModal] = useState(false);

    const [searchString, setSearchString] = useState("");

    const getEmployee = async () => {
        try {
            const response = await axios.get(`${apiUrl}/employees`)
            if (response.status === 200) {
                dispatch({ type: 'EMP_LOADED_SUCCESS', payload: response.data.employees });
            }
        } catch (error) {
            console.log(error);
            dispatch({ type: 'EMP_LOADED_FAIL' });
        }
    }

    const findEmployee = empId => {
        const emp = employeeState.employees.find(employee => employee._id === empId)
        dispatch({ type: 'FIND_EMP', payload: emp })
    }

    const createEmployee = async newEmployee => {
        try {
            const response = await axios.post(`${apiUrl}/employees/create`, newEmployee, { headers: { "Content-Type": "multipart/form-data" } })
            if (response.data.success) {
                dispatch({ type: 'EMP_CREATED_SUCCESS', payload: response.data.employees });
                setTimeout(() => {
                    setProcessing(false);
                    setAlert(true);
                    setAlertMessage(response.data.message);
                    setAlertType("success");
                }, 2000);
                return response.data
            }
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

    const deleteEmployee = async empId => {
        try {
            const response = await axios.patch(`${apiUrl}/employees/delete/${empId}`)
            if (response.data.success) {
                dispatch({ type: 'DELETE_EMP', payload: empId });
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

    const updateEmployee = async (updatedEmp, empId) => {
        try {
            const response = await axios.patch(`${apiUrl}/employees/update/${empId}`, updatedEmp, { headers: { "Content-Type": "multipart/form-data" } })
            if (response.data.success) {
                dispatch({ type: 'UPDATE_EMP', payload: response.data.employee });
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

    const getEmployeeById = async (id) => {
        try {
            const response = await axios.get(`${apiUrl}/employees/${id}`);
            if (response.status === 200) {
                dispatch({ type: 'EMPDETAILS_LOADED_SUCCESS', payload: response.data });
            }
        } catch (error) {
            console.log(error);
            dispatch({ type: 'EMPDETAILS_LOADED_FAIL' });
        }
    }

    const searchEmployee = (query) => {
        const normalizedQuery = unorm.nfd(query).toLowerCase();
        const filteredEmployees = employeeState.employees.filter(employee => {
            const normalizedEmployeeName = unorm.nfd(employee.name).toLowerCase();
            const normalizedEmployeeEmail = unorm.nfd(employee.email).toLowerCase();
            return (
                normalizedEmployeeName.includes(normalizedQuery) ||
                normalizedEmployeeEmail.includes(normalizedQuery) ||
                normalizedQuery.includes(normalizedEmployeeName) ||
                normalizedQuery.includes(normalizedEmployeeEmail)
            );
        });
        dispatch({ type: 'EMP_LOADED_SUCCESS', payload: filteredEmployees });
    };


    const getEmployeeHistories = async (empId) => {
        try {
            const response = await axios.get(`${apiUrl}/employees/history/${empId}`)
            if (response.status === 200) {
                dispatch({ type: 'HISTORY_LOADED_SUCCESS', payload: response.data.histories });
            }
        } catch (error) {
            console.log(error);
            dispatch({ type: 'HISTORY_LOADED_FAIL' });
        }
    }

    const employeeContextData = {
        employeeState,
        getEmployee,
        findEmployee,
        createEmployee,
        deleteEmployee,
        updateEmployee,
        getEmployeeById,
        searchEmployee,
        getEmployeeHistories,
        showModal,
        setShowModal,
        searchString,
        setSearchString
    }

    return (
        <EmployeeContext.Provider value={employeeContextData}>
            {children}
        </EmployeeContext.Provider>
    )
}

export default EmployeeContextProvider
