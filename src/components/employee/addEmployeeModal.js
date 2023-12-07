import { useContext, useState, useEffect } from 'react'
import { EmployeeContext } from '../../contexts/employeeContext'
import { TechnicalContext } from '../../contexts/technicalContext'
import { ComponentsContext } from '../../contexts/componentsContext'

import { Form, Upload, message, Modal } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import TextInput from '../inputs/InputTextCommon'
import Checkbox from '../inputs/CheckBoxCommon'
import RadioButton from '../inputs/RadioCommon'
import Button from '../buttons/ButtonCommon'

const AddEmployeePage = () => {
    const {
        technicalState: { technicals },
        getTechnicals
    } = useContext(TechnicalContext);

    const {
        createEmployee,
        showModal,
        setShowModal
    } = useContext(EmployeeContext);

    const {
        checkedItems,
        radioItem
    } = useContext(ComponentsContext);

    useEffect(() => { getTechnicals() }, [])

    let techOptions = []
    technicals.map(tech => (
        techOptions.push(
            {
                label: tech.name,
                value: tech._id,
            }
        )
    ))

    const genderOptions = [
        {
            label: 'Male',
            value: 'male',
        },
        {
            label: 'Female',
            value: 'female',
        },
        {
            label: 'Other',
            value: 'other',
        },
    ]

    const onFinish = (values) => {
        const formData = new FormData()
        formData.append("image", imgFile);
        formData.append("name", form.getFieldValue("name"));
        formData.append("code", form.getFieldValue("code"));
        formData.append("phone", "+84" + form.getFieldValue("phone"));
        formData.append("email", form.getFieldValue("email"));
        formData.append("identity", form.getFieldValue("identity"));
        formData.append("gender", radioItem);
        formData.append("technical", JSON.stringify(checkedItems));

        createEmployee(formData)
        setShowModal(false);
    };

    const onFinishFailed = (errorInfo) => {
        // handle error here
        console.log('Failed:', errorInfo);
        console.log(form.getFieldValue("name"))
    };

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [imgFile, setImgFile] = useState();

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            return message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            return message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
            setImgFile(info.file.originFileObj)
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div>
                Avatar
            </div>
        </div>
    );

    const handleCancel = () => {
        setShowModal(false);
    };

    const [form] = Form.useForm();

    return (
        <>
            <Modal 
                title="Add new employee" 
                open={showModal} 
                width={800} 
                footer={null}
                onCancel={handleCancel}
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
                                        width: '100%',
                                    }}
                                />
                            ) : (
                                uploadButton
                            )}
                        </Upload>

                    </Form.Item>

                    <Form.Item
                        label="Full Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Enter employee name',
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
                                message: 'Enter employee code',
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
                                message: 'Enter phone number',
                            },
                        ]}
                    >
                        <TextInput addonBefore={"+84"}/>
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Enter email',
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
                                message: 'Enter identity code',
                            },
                        ]}
                    >
                        <TextInput />
                    </Form.Item>

                    <Form.Item
                        label="Technicals"
                        valuePropName="checked"
                    >
                        <Checkbox values={techOptions} />
                    </Form.Item>

                    <Form.Item label="Gender">
                        <RadioButton values={genderOptions} />
                    </Form.Item>

                    <Form.Item labelAlign="right" wrapperCol={{ offset: 20 }}>
                        <Button buttonType={"save"} handleOnClick={() => form.submit()}/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddEmployeePage