import { Outlet } from "react-router-dom";
import React, {useContext} from "react";
import { Sidebar } from "./SideBar";
import { NavBar } from "./NavBar";
import { LayoutContext } from "../../contexts/LayoutContext";

export const Layout = () => {
  const { layout } = useContext(LayoutContext);
  return (
    <div
      className="w-full h-screen"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      {/* SIDE BAR */}
      {layout ? (
        <div
          style={{
            height: "100%",
            // marginRight: spacing / 2,
            //  background: "#ebebeb",
            width: "70px",
            transition: "width 0.3s ease-in-out",
          }}
        >
          <Sidebar />
        </div>
      ) : (
        <div
          style={{
            height: "100%",
            // marginRight: spacing / 2,
            //  background: "#ebebeb",
            width: 290,
            transition: "width 0.3s ease-in-out",
          }}
        >
          <Sidebar />
        </div>
      )}
      {/* HEADER & CONTENT */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          //   marginLeft: spacing / 2,
        }}
      >
        <div
          style={{
            height: 61,
            //  marginBottom: spacing / 2,
            //  background: "#ebebeb",
          }}
        >
          <NavBar />
        </div>
        <div
          className="rounded-t-md"
          style={{
            flex: 1,
            overflowY: "auto",
            // marginTop: spacing / 2,
            background: "#ebebeb",
            overflowX: "hidden",
            padding: "20px 20px 0px 20px",
            borderRadiusTopLeft: 8,
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};
