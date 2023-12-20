/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext } from "react";
import {
  AppstoreOutlined,
  PieChartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { LayoutContext } from "../../contexts/LayoutContext";
import { AuthContext } from "../../contexts/authContext";

export const Sidebar = () => {
  const navigate = useNavigate();
  const { layout } = useContext(LayoutContext);
  const {
    authState: { user },
  } = useContext(AuthContext);

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
    getItem("Dashboard", "", <PieChartOutlined style={{ fontSize: "18px" }} />),
    getItem(
      "Project Management",
      "projectsManagement",
      <AppstoreOutlined style={{ fontSize: "18px" }} />,
      [getItem("All Projects", "project"), getItem("Add Project", "project/add")]
    ),
    getItem(
      "Employees Management",
      "Employees",
      <TeamOutlined style={{ fontSize: "18px" }} />,
      [getItem("All Employees", "employee")]
    ),
  ];

  const onClick = (e) => {
    const path = e.keyPath[0];
    navigate(`/${path}`);
  };

  const navbarBrandStyle = {
    color: "#2c303b",
    fontFamily: "Roboto",
    fontSize: "12px",
    gridArea: "auto",
    lineHeight: "20px",
    margin: "0px 16px 0px 0px",
    padding: "6px 25px",
    textAlign: "center",
  };
  const navbarBrandStyle2 = {
    color: "#2c303b",
    fontFamily: "Roboto",
    fontSize: "12px",
    gridArea: "auto",
    lineHeight: "20px",
    margin: "0px 16px 0px 0px",
    padding: "6px 0px",
    textAlign: "center",
  };
  const logoStyle = {
    display: "inline",
    fontSize: "24px",
    gridArea: "auto",
    lineHeight: "32px",
    padding: "0px 0px 0px 10px",
    textAlign: "center",
    width: "55px",
    height: "55px",
    verticalAlign: "middle",
    marginLeft: "30%",
  };
  const logoStyle2 = {
    display: "inline",
    fontSize: "24px",
    gridArea: "auto",
    lineHeight: "32px",
    padding: "0px 0px 0px 10px",
    textAlign: "center",
    width: "55px",
    height: "55px",
    verticalAlign: "middle",
    marginLeft: "10%",
  };
  const logoNameStyle = {
    color: "#2c303b",
    fontFamily: "Roboto",
    fontSize: "24px",
    gridArea: "auto",
    lineHeight: "20px",
    margin: "0px 16px 0px 0px",
    padding: "6px 10px",
    textAlign: "center",
    marginRight: "30%",
  };

  const userPanelStyle = {
    float: "left",
    width: "100%",
    padding: "25px 0 10px",
    textAlign: "center",
    color: "#060606",
  };
  const imageStyle = {
    color: "#cccccc",
    display: "inline",
    fontSize: "12px",
    gridArea: "auto",
    lineHeight: "21px",
    width: "75px",
    height: "75px",
  };
  const profileUsertitleStyle = {
    color: "#060606",
    fontSize: "12px",
    gridArea: "auto",
    lineHeight: "21px",
    textAlign: "center",
  };

  const profileUsertitleJobStyle = {
    fontSize: "12px",
    gridArea: "auto",
    lineHeight: "16.5px",
    textAlign: "center",
  };

  return (
    <div>
      <div>
        {!layout ? (
          <a className="navbar-brand" href="/" style={navbarBrandStyle}>
            <img
              src="https://res.cloudinary.com/do0ououdk/image/upload/v1702892473/bfngqqrk96hhao6fbfnv.png"
              alt="Logo"
              style={logoStyle}
            />
            <span className="logo_name" style={logoNameStyle}>
              7T4
            </span>
          </a>
        ) : (
          <a className="navbar-brand" href="/" style={navbarBrandStyle2}>
            <img
              src="https://res.cloudinary.com/do0ououdk/image/upload/v1702892473/bfngqqrk96hhao6fbfnv.png"
              alt="Logo"
              style={logoStyle2}
            />
          </a>
        )}
      </div>
      <div>
        {!layout && (
          <div className="sidebar-user-panel">
            <div className="user-panel" style={userPanelStyle}>
              <div className="image">
                <img
                  alt="User Image"
                  className="img-circle user-img-circle"
                  style={imageStyle}
                  src="https://res.cloudinary.com/dfz0xsh2d/image/upload/v1702981453/Image_OJT7T4_Project1/35493994-36e2c50e-04d9-11e8-8b38-890caea01850_mayhtv.png"
                />
              </div>
            </div>
            <div className="profile-usertitle">
              <div
                className="sidebar-userpic-name"
                style={profileUsertitleStyle}
              >
                7T4
              </div>
              {user && (
                <div
                  className="profile-usertitle-job"
                  style={profileUsertitleJobStyle}
                >
                  {user.username}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div>
        {!layout ? (
          <Menu
            onClick={onClick}
            style={{
              borderColor: "white",
              marginTop: 40,
              width: "100%",
            }}
            mode="inline"
            inlineCollapsed={layout}
            items={items}
          />
        ) : (
          <Menu
            onClick={onClick}
            style={{
              borderColor: "white",
              width: "100%",
            }}
            mode="inline"
            inlineCollapsed={layout}
            items={items}
          />
        )}
      </div>
    </div>
  );
};
