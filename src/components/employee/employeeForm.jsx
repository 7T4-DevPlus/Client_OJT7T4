/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect } from 'react';
import { Form, Upload, message, Row, Col, Tag, Popover, Button } from 'antd';

import { EmployeeContext } from '../../contexts/employeeContext';
import { TechnicalContext } from '../../contexts/technicalContext';
import { ComponentsContext } from '../../contexts/componentsContext';

import TextInput from '../../components/inputs/InputTextCommon';
import RadioButton from '../inputs/RadioCommon';
import Select from '../inputs/SelectCommon';
import NumberInput from '../inputs/InputNumberCommon';
import ButtonCommon from '../buttons/ButtonCommon';

import countryCode from '../../JsonData/CountryCodes.json';

const EmployeeForm = (employee) => {
  const { updateEmployee } = useContext(EmployeeContext);

  const {
    technicalState: { technicals },
    getTechnicals,
  } = useContext(TechnicalContext);

  const { processing, setProcessing } = useContext(ComponentsContext);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getTechnicals();
  }, []);

  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const techOptions = technicals.map(({ _id, name }) => ({
    label: name,
    value: _id,
  }));

  const [employeeTechnicals, setEmployeeTechnicals] = useState(
    employee.employee.technical
  );

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
        addonBefore={selectTech}
        min={0}
        max={10}
        onChange={handlePointChange}
        defaultValue={0}
      />
      <br />
      <Row>
        <Col>
          <ButtonCommon buttonType={"cancel"} handleOnClick={() => hide()} />
        </Col>
        <Col>
          <ButtonCommon buttonType={"save"} handleOnClick={() => addTech()} />
        </Col>
      </Row>
    </div>
  );

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

  const [checkedGender, setCheckedGender] = useState(employee.employee.gender);
  const onGenderChange = (e) => {
    setCheckedGender(e.target.value);
  };

  const phoneOptions = countryCode.map(({ name, dial_code }) => ({
    label: name,
    value: dial_code,
  }));

  const phoneNumber = employee.employee.phone;

  const defaultDialCode = phoneNumber.slice(0, 3);
  const actualNumber = phoneNumber.slice(3);

  const [dialCode, setDialCode] = useState(defaultDialCode);

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

  const validateName = (rule, value) => {
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>0-9]/;
    if (specialCharacterRegex.test(value)) {
      return Promise.reject(
        "Name should not contain special characters or numbers"
      );
    }
    return Promise.resolve();
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{9,12}$/;
    return phoneRegex.test(phoneNumber);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onFinish = async () => {
    try {
      const formData = new FormData();

      if (imgFile) {
        formData.append("image", imgFile);
      }

      if (!validatePhoneNumber(form.getFieldValue("phone"))) {
        form.setFields([
          {
            name: "phone",
            errors: ["Please enter a valid phone number (10 digits)"],
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

      updateEmployee(formData, employee.employeeId);
      setProcessing(true);

      setTimeout(() => {
        setIsEditing(!isEditing);
      }, 2000);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

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
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setImageUrl(url);
      });
      setImgFile(info.file.originFileObj);
    }
  };

  return (
    <>
      <div>
        {isEditing ? (
          processing ? (
            <ButtonCommon buttonType={"loading"} />
          ) : (
            <ButtonCommon
              buttonType={"save"}
              handleOnClick={() => form.submit()}
            />
          )
        ) : (
          <ButtonCommon
            buttonType={"edit-text"}
            handleOnClick={() => handleEdit()}
          />
        )}
      </div>
      <div style={{ width: "80%", display: "flex", justifyContent: "center" }}>
        <h1 style={{ textAlign: "center" }}>
          {employee.employee.name}'s Information
        </h1>
      </div>
      <div style={{ width: "80%", display: "flex", justifyContent: "center" }}>
        <Form
          form={form}
          name="add employee"
          layout="vertical"
          initialValues={{
            remember: true,
            name: employee.employee.name,
            code: employee.employee.code,
            phone: actualNumber,
            email: employee.employee.email,
            identity: employee.employee.identity,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          disabled={!isEditing}
        >
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
                <img
                  src={employee.employee.image}
                  alt="avatar"
                  style={{
                    width: "100%",
                  }}
                />
              )}
            </Upload>
          </Form.Item>

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

          <Row>
            <Col span={12}>
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
            <Col span={12}>
              {employeeTechnicals.map((tech) => {
                const technical = technicals.find(
                  (t) => t._id === tech.technicalId._id
                );
                return (
                  <Tag
                    color={"blue"}
                    key={tech.technicalId._id}
                    closeIcon={isEditing}
                    onClose={() => removeTechnical(tech.technicalId)}
                  >
                    {technical ? `${technical.name} - ${tech.point}` : ""}
                  </Tag>
                );
              })}
            </Col>
          </Row>

          <Form.Item label="Gender">
            <RadioButton
              options={genderOptions}
              defaultValue={checkedGender}
              onChange={onGenderChange}
            />
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default EmployeeForm