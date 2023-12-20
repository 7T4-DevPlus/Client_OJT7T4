/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect } from "react";
import { EmployeeContext } from "../../contexts/employeeContext";
import { TechnicalContext } from "../../contexts/technicalContext";
import { ComponentsContext } from "../../contexts/componentsContext";

import { Form, Upload, message, Col, Modal, Row, Tag } from "antd";
import { Popover, Button } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import TextInput from "../../components/inputs/InputTextCommon";
import NumberInput from "../inputs/InputNumberCommon";
import RadioButton from "../../components/inputs/RadioCommon";
import ButtonCommon from "../../components/buttons/ButtonCommon";
import Select from "../../components/inputs/SelectCommon";

import countryCode from "../../JsonData/CountryCodes.json";

const AddEmployeePage = () => {
  const {
    technicalState: { technicals },
    getTechnicals,
  } = useContext(TechnicalContext);

  const { createEmployee, showModal, setShowModal } =
    useContext(EmployeeContext);

  const { processing, setProcessing } = useContext(ComponentsContext);

  useEffect(() => {
    getTechnicals();
  }, []);

  const genderOptions = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
    {
      label: "Other",
      value: "other",
    },
  ];

  const [checkedGender, setCheckedGender] = useState("");
  const onGenderChange = (e) => {
    setCheckedGender(e.target.value);
  };

  const phoneOptions = countryCode.map(({ name, dial_code }) => ({
    label: name,
    value: dial_code,
  }));

  const [dialCode, setDialCode] = useState("+84");

  const handlePhoneChange = (value) => {
    setDialCode(value);
  };

  const selectPhone = (
    <Select
      onChange={handlePhoneChange}
      options={phoneOptions}
      defaultValue={dialCode}
    />
  );

  const techOptions = technicals.map(({ _id, name }) => ({
    label: name,
    value: _id,
  }));

  const [employeeTechnicals, setEmployeeTechnicals] = useState([]);

  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen) => {
    setTechnical("Technical");
    setPoint(0);
    setOpen(newOpen);
  };

  const hide = () => {
    setOpen(false);
  };

  const isTechnicalExist = (techId) => {
    return employeeTechnicals.some((tech) => tech.technicalId === techId);
  };

  const addTech = () => {
    if (technical === "Technical") {
      message.error("Please select technical");
      return;
    }

    if (isTechnicalExist(technical)) {
      message.warning("Technical already exists for this employee");
      return;
    }

    setEmployeeTechnicals((prevTechnicals) => [
      ...prevTechnicals,
      {
        technicalId: technical,
        point: point,
      },
    ]);
    setOpen(false);
  };

  const removeTechnical = (removedTechId) => {
    const updatedTechnicals = employeeTechnicals.filter(
      (tech) => tech.technicalId !== removedTechId
    );
    setEmployeeTechnicals(updatedTechnicals);
  };

  const [technical, setTechnical] = useState("Technical");
  const handleTechChange = (value) => {
    setTechnical(value);
  };

  const [point, setPoint] = useState(0);
  const handlePointChange = (value) => {
    setPoint(value);
  };

  const selectTech = (
    <Select
      onChange={handleTechChange}
      options={techOptions}
      defaultValue={technical}
    />
  );

  const content = (
    <div>
      <NumberInput
        addonBefore={<div style={{ width: "60px" }}>{selectTech}</div>}
        min={0}
        max={10}
        onChange={handlePointChange}
        defaultValue={0}
      />
      <br />
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <ButtonCommon buttonType={"cancel"} handleOnClick={() => hide()} />
        <ButtonCommon buttonType={"save"} handleOnClick={() => addTech()} />
      </div>
    </div>
  );

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{9,12}$/;
    return phoneRegex.test(phoneNumber);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (rule, value) => {
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>0-9]/;
    if (specialCharacterRegex.test(value)) {
      return Promise.reject(
        "Name should not contain special characters or numbers"
      );
    }
    return Promise.resolve();
  };

  const onFinish = (values) => {
    const formData = new FormData();

    if (imgFile) {
      formData.append("image", imgFile);
    }

    if (!validatePhoneNumber(form.getFieldValue("phone"))) {
      form.setFields([
        {
          name: "phone",
          errors: ["Please enter a valid phone number (9 - 12 digits)"],
        },
      ]);
      return;
    }

    if (!validateEmail(form.getFieldValue("email"))) {
      form.setFields([
        {
          name: "email",
          errors: ["Please enter a valid email address"],
        },
      ]);
      return;
    }

    formData.append("name", form.getFieldValue("name"));
    formData.append("code", form.getFieldValue("code"));
    formData.append("phone", dialCode + form.getFieldValue("phone"));
    formData.append("email", form.getFieldValue("email"));
    formData.append("identity", form.getFieldValue("identity"));
    formData.append("gender", checkedGender);
    formData.append("technical", JSON.stringify(employeeTechnicals));

    setProcessing(true);
    createEmployee(formData);

    setTimeout(() => {
      setShowModal(false);
      form.resetFields();
      form.resetFields(["gender"]);
      setEmployeeTechnicals([]);
      setImageUrl(null);
    }, 3000);
  };

  const onFinishFailed = (errorInfo) => {
    // handle error here
    console.log("Failed:", errorInfo);
    form.resetFields();
    form.resetFields(["gender"]);
    setEmployeeTechnicals([]);
    setImageUrl(null);
  };

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [imgFile, setImgFile] = useState();

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      return message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      return message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
      setImgFile(info.file.originFileObj);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div>Avatar</div>
    </div>
  );

  const handleCancel = () => {
    setShowModal(false);
    form.resetFields();
    form.resetFields(["gender"]);
    setEmployeeTechnicals([]);
    setImageUrl(null);
  };

  const [form] = Form.useForm();

  return (
    <Modal
      title="Add new employee"
      open={showModal}
      footer={null}
      onCancel={handleCancel}
      centered
      width={1000}
      closable={false}
    >
      <Form
        form={form}
        name="add employee"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row gutter={{ xs: 8, sm: 12, md: 24, lg: 32, }}>
                    <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item valuePropName="image" getValueFromEvent={imageUrl}>
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{
                      width: "100%",
                    }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item label="Gender" name="gender">
              <RadioButton options={genderOptions} onChange={onGenderChange} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
        <Col xs={24} sm={24} md={11} lg={11}>
            <Form.Item
              label="Full Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Enter employee name",
                },
                {
                  validator: validateName,
                },
              ]}
            >
              <TextInput />
            </Form.Item>
          </Col>
          <Col span={2}></Col>
          <Col xs={24} sm={24} md={11} lg={11}>
            <Form.Item
              label="Identity code"
              name="identity"
              rules={[
                {
                  required: true,
                  message: "Enter identity code",
                },
              ]}
            >
              <TextInput />
            </Form.Item>
          </Col>
        </Row>

        <Row>
        <Col xs={24} sm={24} md={11} lg={11}>
            <Form.Item
              label="Employee code"
              name="code"
              rules={[
                {
                  required: true,
                  message: "Enter employee code",
                },
              ]}
            >
              <TextInput />
            </Form.Item>
          </Col>
          <Col span={2}></Col>
          <Col xs={24} sm={24} md={11} lg={11}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Enter email",
                },
              ]}
            >
              <TextInput />
            </Form.Item>
          </Col>
        </Row>

        <Row>
        <Col xs={24} sm={24} md={14} lg={14}>
            <Form.Item
              label="Phone number"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Enter phone number",
                },
              ]}
            >
              <TextInput addonBefore={selectPhone} prefix={dialCode} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
        <Col span={8}>
            <Form.Item label="Technicals" name="technicals">
              <Popover
                content={content}
                title="Add technical"
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
                placement="topLeft"
                style={{ width: "100px" }}
              >
                <Button>Add technical</Button>
              </Popover>
            </Form.Item>
          </Col>
          <Col span={16}>
            {employeeTechnicals.map((tech) => {
              const technical = technicals.find(
                (t) => t._id === tech.technicalId
              );
              return (
                <Tag
                  color={"blue"}
                  key={tech.technicalId}
                  closeIcon={true}
                  onClose={() => removeTechnical(tech.technicalId)}
                  style={{ marginBottom: "5px" }}
                >
                  {technical ? `${technical.name} - ${tech.point}` : ""}
                </Tag>
              );
            })}
          </Col>
        </Row>
      </Form>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ marginRight: "10px" }}>
          <ButtonCommon
            buttonType={"cancel"}
            handleOnClick={() => handleCancel()}
          />
        </div>
        {processing === true ? (
          <ButtonCommon buttonType={"loading"} />
        ) : (
          <ButtonCommon
            buttonType={"save"}
            handleOnClick={() => form.submit()}
          />
        )}
      </div>
    </Modal>
  );
};

export default AddEmployeePage;
