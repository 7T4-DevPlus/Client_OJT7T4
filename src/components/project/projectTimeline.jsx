/* eslint-disable array-callback-return */
import React from "react";
import { Timeline } from "antd";
import { format } from "date-fns";

const ProjectTimeline = (employeesInProject) => {
  const empInPro = employeesInProject.employeesInProject;

  const currentDate = format(new Date(), "yyyy-MM-dd ");

  const empTimeline = [];
  empInPro.map((emp) => {
    let joinDate = format(new Date(emp.joinDate), "yyyy-MM-dd ");
    let outDate = emp.outDate
      ? format(new Date(emp.outDate), "yyyy-MM-dd ")
      : null;

    empTimeline.push({
      label: joinDate,
      children:
        joinDate > currentDate
          ? `planning join-${emp.employeeId.name}`
          : `join-${emp.employeeId.name}`,
      color: joinDate > currentDate ? "gray" : "green",
    });

    if (outDate) {
      empTimeline.push({
        label: outDate,
        children:
          outDate > currentDate
            ? `planning out-${emp.employeeId.name}`
            : `out-${emp.employeeId.name}`,
        color: outDate > currentDate ? "gray" : "red",
      });
    }
  });

  empTimeline.sort((a, b) => new Date(a.label) - new Date(b.label));

  return (
    <>
      <h1>Project Timeline</h1>
      <Timeline mode={"left"} items={empTimeline} />
    </>
  );
};

export default ProjectTimeline;
