import React, { useContext, useEffect, useState } from "react";
import { Avatar } from "antd";
import {
  AntDesignOutlined,
  DownOutlined,
  LogoutOutlined,
  HistoryOutlined,
  BellOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import { LayoutContext } from "../../contexts/LayoutContext";
import { AuthContext } from "../../contexts/authContext";

import SearchBox from "./searchBox";
import { LOCAL_STORAGE_TOKEN_NAME } from "../../contexts/constants";

export const NavBar = () => {
  const navigate = useNavigate();
  const { layout, setLayout } = useContext(LayoutContext);
  const { logoutUser } = useContext(AuthContext);

  const [isShowSearch, setIsShowSearch] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    if (["/employee", "/project"].includes(currentPath)) {
      return setIsShowSearch(true);
    }
    setIsShowSearch(false);
  }, [currentPath]);

  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    return navigate("/login");
  };

  const Username = (props) => {
    return (
      <p
        style={{
          fontWeight: "500",
          fontSize: "15",
          marginBottom: "0",
          marginTop: 4,
        }}
      >
        {props.name}
      </p>
    );
  };
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleLogout()}
          style={{ fontWeight: "bold", fontSize: "larger" }}
        >
          <LogoutOutlined style={{ marginRight: "10px" }} />
          Logout
        </a>
      ),
    },
  ];
  const onClick = (e) => {
    console.log("click ", e);
  };
  return (
    <div
      //  className="nav-container"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ marginLeft: 20, width: 30 }}>
        <MenuOutlined
          style={{ fontSize: "20px" }}
          onClick={() => {
            setLayout(!layout);
          }}
        />
      </div>

      <div style={{ width: "40%" }}>{isShowSearch ? <SearchBox /> : ""}</div>

      {/* <div style={{ marginLeft: "10vw", width: "10vw" }}></div> */}
      <div
        style={{
          display: "flex",
          marginRight: 20,
          width: "fit-content",
          alignItems: "center",
        }}
      >
        <HistoryOutlined
          style={{ marginRight: "25px", fontSize: "20px" }}
          onClick={() => {
            navigate("/log");
          }}
        />
        <Dropdown
          menu={{
            items,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Username name="Admin" />
            <Avatar
              size={{
                xs: 15,
                md: 15,
              }}
              src="https://res.cloudinary.com/dfz0xsh2d/image/upload/v1702260661/c7qizzx5bcgelc4s9fud.png"
              style={{ marginLeft: "10px" }}
            />
          </div>
          {/* <a onClick={onClick}>
             <div className="Nav" style={{ right: 0 }}>
               <span className="nav-role">
                 <Username name="Admin" />
               </span>
               <Space>
                 <Avatar
                   size={{
                     xs: 26,
                     sm: 30,
                     md: 37,
                     lg: 46,
                     xl: 50,
                     xxl: 60,
                   }}
                   src="https://res.cloudinary.com/dfz0xsh2d/image/upload/v1702260661/c7qizzx5bcgelc4s9fud.png"
                   style={{ marginLeft: "10px" }}
                 />
               </Space>
             </div>
           </a> */}
        </Dropdown>
      </div>
    </div>
  );
};
