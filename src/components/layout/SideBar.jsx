import React, {useContext} from "react";
import { AppstoreOutlined, PieChartOutlined, TeamOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from 'react-router-dom';
import { LayoutContext } from "../../contexts/LayoutContext";

export const Sidebar = () => {
   const navigate = useNavigate();
   const { layout } = useContext(LayoutContext);

   function getItem(label, key, icon, children, type) {
      return {
         key,
         icon,
         children,
         label,
         type,
      };
   }

   const items = [
      getItem(
         "Dashboard",
         "dashboard",
         <PieChartOutlined style={{ fontSize: "22px" }} />
      ),
      getItem(
         "Project Management",
         "Projects",
         <AppstoreOutlined style={{ fontSize: "22px" }} />,
         [getItem("All Project", "project"), getItem("Add Project", "addProject")]
      ),
      getItem(
         "Employees Management",
         "Employees",
         <TeamOutlined style={{ fontSize: "22px" }} />,
         [getItem("All Employees", "employee"), getItem("Add Employees", "addEmployee")]
      ),
   ];

   const onClick = (e) => {
      const path = e.keyPath[0];
      navigate(`/${path}`);
   };
   const Username = (props) => {
      return <p style={{ fontWeight: "700", fontSize: "x-large" }}>{props.name}</p>;
   };
   return (
     <div>
       <Menu
         onClick={onClick}
         style={{
           borderColor: "white",
           marginTop: 60,
           width: "100%",
         }}
         mode="inline"
         inlineCollapsed={layout}
         items={items}
       />
     </div>
   );
};
