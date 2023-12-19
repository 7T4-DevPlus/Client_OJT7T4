/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { ProjectContext } from "../../contexts/projectContext";
import { TechnicalContext } from "../../contexts/technicalContext";
import { ComponentsContext } from "../../contexts/componentsContext";

import { Form } from "antd";
import TextInput from "../../components/inputs/InputTextCommon";
import TextArea from "../../components/inputs/InputTextArea";
import DatePicker from "../../components/inputs/DateCommon";
import Select from "../../components/inputs/SelectCommon";
import Checkbox from "../../components/inputs/CheckBoxCommon";
import Button from "../../components/buttons/ButtonCommon";

const AddProject = () => {
  const navigate = useNavigate();

  const { createProject } = useContext(ProjectContext);

  const {
    technicalState: { technicals },
    getTechnicals,
  } = useContext(TechnicalContext);

  const { processing, setProcessing } = useContext(ComponentsContext);

  const [form] = Form.useForm();
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    getTechnicals();
  }, []);

  const techOptions = technicals.map(({ _id, name }) => ({
    label: name,
    value: _id,
  }));

  const [checkedTech, setCheckedTech] = useState([]);
  const onTechChange = (checkedValues) => {
    setCheckedTech(checkedValues);
  };

  const [status, setStatus] = useState("");

  const statusOptions = [
    { value: "Planning", label: "Planning" },
    { value: "Running", label: "Running" },
    { value: "Completed", label: "Completed" },
    { value: "Closed", label: "Closed" },
  ];

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const [date, setDate] = useState(null);
  const handleChangeDate = (date, dateString) => {
    const formattedDates = moment(
      dateString,
      "YYYY-MM-DDTHH:mm:ss.SSSZ"
    ).toISOString();
    setDate(formattedDates);
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("startDate", date);
    formData.append("status", status);
    formData.append("technical", JSON.stringify(checkedTech));

    setProcessing(true);
    setDisable(true);
    createProject(formData);

    if (processing === false) {
      setTimeout(() => {
        navigate(`/project`);
      }, 2000);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Add new project</h1>
        <div style={{ width: "80%" }}>
          <Form
            form={form}
            name="Project information"
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            disabled={disable}
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
              <DatePicker onChange={handleChangeDate} />
            </Form.Item>

            <Form.Item label="Project's status" name="status">
              <Select options={statusOptions} onChange={handleStatusChange} />
            </Form.Item>

            <Form.Item
              label="Technicals"
              name="technicals"
              valuePropName="checked"
            >
              <Checkbox options={techOptions} onChange={onTechChange} />
            </Form.Item>

            <Form.Item labelAlign="right" wrapperCol={{ offset: 20 }}>
              {disable === true ? (
                <Button buttonType={"loading"} />
              ) : (
                <Button
                  buttonType={"save"}
                  handleOnClick={() => form.submit()}
                />
              )}
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddProject;
