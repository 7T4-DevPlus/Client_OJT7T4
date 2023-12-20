/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import dayjs from "dayjs";

import { ProjectContext } from "../../contexts/projectContext";
import { TechnicalContext } from "../../contexts/technicalContext";
import { ComponentsContext } from "../../contexts/componentsContext";

import { Form } from "antd";

import TextInput from "../inputs/InputTextCommon";
import Button from "../buttons/ButtonCommon";
import DatePicker from "../inputs/DateCommon";
import Select from "../inputs/SelectCommon";
import Checkbox from "../inputs/CheckBoxCommon";
import TextArea from "../inputs/InputTextArea";

import ConfirmModal from "../../components/Modal/ConfirmModal";

const ProjectForm = (project) => {
  const projectInfo = project.project;

  const {
    projectState: { employeesInProject },
    updateProject,
    closeProject,
    removeEmployeeFromProject,
  } = useContext(ProjectContext);

  const filteredEmpInPro = employeesInProject.filter(
    (emp) => emp.isWorking === true && emp.employeeId.isDelete === false
  );

  const { processing, setProcessing } = useContext(ComponentsContext);

  const {
    technicalState: { technicals },
    getTechnicals,
  } = useContext(TechnicalContext);

  useEffect(() => {
    getTechnicals();
  }, [project]);

  const techOptions = technicals.map(({ _id, name }) => ({
    label: name,
    value: _id,
  }));

  const defaultCheckedList = projectInfo.technical.map(({ _id }) => _id);

  const [checkedTech, setCheckedTech] = useState(defaultCheckedList);
  const onTechChange = (checkedValues) => {
    setCheckedTech(checkedValues);
  };

  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);

  const [status, setStatus] = useState(projectInfo.status);

  const statusOprions = [
    { value: "Planning", label: "Planning" },
    { value: "Running", label: "Running" },
    { value: "Completed", label: "Completed" },
  ];

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const [date, setDate] = useState(projectInfo.startDate);
  const dateFormat = moment(date).format("DD/MM/YYYY").toString();
  const handleChangeDate = (date, dateString) => {
    const formattedDates = moment(
      dateString,
      "YYYY-MM-DDTHH:mm:ss.SSSZ"
    ).toISOString();
    setDate(formattedDates);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onFinish = async (values) => {
    console.log(values);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("startDate", date);
    formData.append("status", status);
    formData.append("technical", JSON.stringify(checkedTech));

    setProcessing(true);
    updateProject(formData, projectInfo._id);

    setTimeout(() => {
      setIsEditing(!isEditing);
    }, 2000);
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const closedBtnOnClick = () => {
    setShowConfirmModal(true);
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
  };

  const handleClose = (projectId) => {
    if (filteredEmpInPro.length > 0) {
      filteredEmpInPro.map((emp) => {
        removeEmployeeFromProject(emp._id);
      });
    }

    closeProject(projectId);
    setShowConfirmModal(false);
  };

  let btn = (
    <>
      {projectInfo.isActive ? (
        isEditing ? (
          processing ? (
            <Button buttonType={"loading"} />
          ) : (
            <>
              <Button buttonType={"save"} handleOnClick={() => form.submit()} />
            </>
          )
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                buttonType={"edit-text"}
                handleOnClick={() => handleEdit()}
              />
              <Button
                buttonType={"delete-text"}
                handleOnClick={() => closedBtnOnClick()}
              />
            </div>
          </>
        )
      ) : (
        <p>This project is closed</p>
      )}
    </>
  );

  return (
    <>
      <div>
        <h2>Project details</h2>
        {btn}
      </div>
      <Form
        form={form}
        name="Project information"
        layout="vertical"
        initialValues={{
          remember: true,
          name: projectInfo.name,
          description: projectInfo.description,
          status: projectInfo.status,
          technicals: defaultCheckedList,
          startDate: dayjs(dateFormat, "DD/MM/YYYY"),
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        disabled={!isEditing}
      >
        <Form.Item
          label="Project Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Enter project name",
            },
          ]}
        >
          <TextInput />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <TextArea />
        </Form.Item>

        <Form.Item label="Start date" name="startDate">
          <DatePicker
            defaultValue={dayjs(dateFormat, "DD/MM/YYYY")}
            format={"YYYY-MM-DD"}
            onChange={handleChangeDate}
          />
        </Form.Item>

        <Form.Item label="Project's status" name="status">
          <Select options={statusOprions} onChange={handleStatusChange} />
        </Form.Item>

        <Form.Item label="Technicals" name="technicals" valuePropName="checked">
          <Checkbox
            options={techOptions}
            defaultValue={checkedTech}
            onChange={onTechChange}
          />
        </Form.Item>
      </Form>
      <ConfirmModal
        visible={showConfirmModal}
        handleOk={() => handleClose(projectInfo._id)}
        handleCancel={() => handleCancel()}
        title={"Confirm close project"}
        message={"Do you want to close this project?"}
      />
    </>
  );
};

export default ProjectForm;
