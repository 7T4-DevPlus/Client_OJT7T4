import { useContext } from "react";
import { EmployeeContext } from "../../contexts/employeeContext";
import { ProjectContext } from '../../contexts/projectContext';
import { ComponentsContext } from "../../contexts/componentsContext";
import { Input } from 'antd';

const SearchBox = () => {
    const { setSearchString } = useContext(EmployeeContext);

    const { setSearchProject } = useContext(ProjectContext);

    const { searchType } = useContext(ComponentsContext);

    return (
        <>
            {searchType === "employee" ? (
                <Input placeholder="Input employee search text" size="large" onChange={(e) => { setSearchString(e.target.value) }} />
            ) : (
                <Input placeholder="Input project search text" size="large" onChange={(e) => { setSearchProject(e.target.value) }} />
            )}
        </>
    )
}

export default SearchBox