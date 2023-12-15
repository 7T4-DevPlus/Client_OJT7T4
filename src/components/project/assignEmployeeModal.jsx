import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { format } from 'date-fns';

import { ProjectContext } from '../../contexts/projectContext';
import { RoleContext } from '../../contexts/roleContext';
import { EmployeeContext } from '../../contexts/employeeContext';

import { Modal, Form, message } from 'antd';

import Button from '../buttons/ButtonCommon';
import TextArea from '../inputs/InputTextArea';
import DatePicker from '../inputs/DateCommon';
import Select from '../inputs/SelectCommon';

const AssignEmployeeModal = (project) => {
  const {
    addEmployeeModal,
    setAddEmployeeModal,
    addEmployeeToProject
  } = useContext(ProjectContext);

  const {
    employeeState: { employees },
    getEmployee,
  } = useContext(EmployeeContext);

  const {
    getRoles,
    roleState: { roles },
  } = useContext(RoleContext);

  const projectInfo = project.project;
  const projectId = projectInfo._id;

  useEffect(() => {
    getEmployee();
    getRoles();
  }, []);

  const handleCancel = () => {
    setAddEmployeeModal(false);
  };

  const employeeOptions = employees.map(({ _id, name }) => ({
    label: name,
    value: _id,
  }));

  const roleOptions = roles.map(({ _id, name }) => ({
    label: name,
    value: _id,
  }));

  const [date, setDate] = useState([]);
  const currentDate = format(new Date(), 'yyyy-MM-dd ');

  const handleChangeDate = (date, dateString) => {
    const formattedDate = moment(dateString, 'YYYY-MM-DDTHH:mm:ss.SSSZ').toISOString();

    if ( moment(projectInfo.startDate).isAfter(moment(formattedDate)) === true ){
      message.error('Join date must not be sooner than project start date');
      return;
    }

    setDate(formattedDate);
  }

  const [form] = Form.useForm();

  const onFinishFailed = (errorInfo) => {
    console.error('Failed:', errorInfo);
    form.resetFields();
  };

  const onFinish = (values) => {
    const formData = new FormData()
    formData.append("employeeId", values.employeeId);
    formData.append("projectId", projectId);
    formData.append("role", values.role);
    formData.append("joinDate", date);
    formData.append("description", values.description);

    addEmployeeToProject(formData);
    setAddEmployeeModal(false);
    form.resetFields();
  }

  return (

    <Modal
      title={`Add employee to project`}
      open={addEmployeeModal}
      onCancel={handleCancel}
      footer={null}
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
        <Form.Item
          label="Employee"
          name="employeeId"
          rules={[
            {
              required: true,
              message: 'Enter select employee',
            },
          ]}
        >
          <Select
            showSearch
            style={{
              width: 200,
            }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={employeeOptions}
          />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[
            {
              required: true,
              message: 'Enter select role for employee',
            },
          ]}
        >
          <Select
            showSearch
            style={{
              width: 200,
            }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={roleOptions}
          />
        </Form.Item>

        <Form.Item
          label="Join Date"
          name="date"
          rules={[
            {
              required: true,
              message: 'Please select join date',
            }
          ]}
        >
          <DatePicker onChange={handleChangeDate} />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <TextArea />
        </Form.Item>

        <Form.Item labelAlign="right" wrapperCol={{ offset: 20 }}>
          <Button buttonType={"save"} handleOnClick={() => form.submit()} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AssignEmployeeModal