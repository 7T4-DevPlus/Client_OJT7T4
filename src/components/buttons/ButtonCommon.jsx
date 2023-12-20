import React from "react";
import {
    PlusOutlined,
    ReloadOutlined,
    FormOutlined,
    DeleteTwoTone
} from "@ant-design/icons";
import { Button, Flex } from "antd";
import './ButtonComponent.css';

const ButtonCommon = ({ buttonType, size = "large", handleOnClick, ...props }) => {
    return (
        <Flex gap="small" wrap="wrap" className="site-button-ghost-wrapper">
            {buttonType === "reload" && (
                <Button shape="circle" icon={<ReloadOutlined />} size={size} onClick={handleOnClick} />
            )}
            {buttonType === "add" && (
                <Button shape="circle" icon={<PlusOutlined />} size={size} onClick={handleOnClick} />
            )}
            {buttonType === "edit" && (
                <Button type="edit"
                    icon={<FormOutlined style={{ fontSize: '16px', color: '#3F51B5' }} />}
                    onClick={handleOnClick}
                >
                </Button>
            )}
            {buttonType === "delete" && (
                <Button type="delete"
                    icon={<DeleteTwoTone twoToneColor=" #eb2f96 " />}
                    onClick={handleOnClick}
                >
                </Button>
            )}
            {buttonType === "delete-text" && (
                <Button type="primary" size={size} danger onClick={handleOnClick}>
                    Delete
                </Button>
            )}
            {buttonType === "edit-text" && (
                <Button className="edit-button" size={size} onClick={handleOnClick}>
                    Edit
                </Button>
            )}
            {buttonType === "save" && (
                <Button size={size} className="save-button" onClick={handleOnClick}>
                    Save
                </Button>
            )}
            {buttonType === "cancel" && (
                <Button className="cancel-button" size={size} onClick={handleOnClick}>
                    Cancel
                </Button>
            )}
            {buttonType === "loading" && (
                <Button size={size} className="loading-button" type="primary" loading>
                    Loading
                </Button>
            )}
            {buttonType === "add-button" && (
                <Button className="edit-button" size={size} onClick={handleOnClick}>
                    Add
                </Button>
            )}
            {buttonType === "details" && (
                <Button type="primary" ghost size={size} onClick={handleOnClick}>
                    Details
                </Button>
            )}
            {buttonType === "export" && (
                <Button className="edit-button" size={size} onClick={handleOnClick}>
                    Export
                </Button>
            )}
        </Flex>


    );
};

export default ButtonCommon;
