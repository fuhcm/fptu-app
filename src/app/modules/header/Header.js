import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Header.scss";

import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "../../utils/LocalStorage";

import { Layout, Menu, Icon, Button, notification } from "antd";

const { Header } = Layout;

class HeaderPage extends Component {
    onLogout = e => {
        e.preventDefault();

        LocalStorageUtils.removeItem(LOCAL_STORAGE_KEY.JWT);
        LocalStorageUtils.removeItem(LOCAL_STORAGE_KEY.EMAIL);
        this.props.history.push("/login");
    };

    openNotification = () => {
        const key = `open${Date.now()}`;
        const btn = (
            <Button
                type="primary"
                size="small"
                onClick={() => notification.close(key)}
            >
                Tui biết rồi
            </Button>
        );

        notification.open({
            message: "Thông báo từ FPTUCF-DEV",
            description:
                "Bạn có thể xem những confess bạn đã gửi trong mục 'confess của tui', trong đó có luôn trạng thái được duyệt hay chưa, người duyệt và lí do bị từ chối ngoài ra còn có ID để bạn xem lại trên fanpage nữa, chúc zui!!",
            btn,
            key,
            duration: 0,
            icon: <Icon type="github" style={{ color: "#108ee9" }} />,
        });
    };

    render() {
        if (!LocalStorageUtils.isNotificationLoaded()) {
            this.openNotification();
            LocalStorageUtils.setNotificationLoaded();
        }

        return (
            <Header>
                <Menu
                    theme="light"
                    mode="horizontal"
                    style={{ lineHeight: "64px" }}
                >
                    <Menu.Item key="/">
                        <Link to="/">
                            <Icon type="home" />
                            trang chủ
                        </Link>
                    </Menu.Item>
                    {!LocalStorageUtils.isAuthenticated() && (
                        <Menu.Item key="/send">
                            <Link to="/send">
                                <Icon type="mail" />
                                gửi confess
                            </Link>
                        </Menu.Item>
                    )}
                    {!LocalStorageUtils.isAuthenticated() && (
                        <Menu.Item key="/my-confess">
                            <Link to="/my-confess">
                                <Icon type="folder" />
                                confess của tui
                            </Link>
                        </Menu.Item>
                    )}
                    <Menu.Item key="/faq">
                        <Link to="/faq">
                            <Icon type="question" />
                            hỏi đáp
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/admin-cp">
                        <Link to="/admin-cp">
                            <Icon type="login" />
                            admin{" "}
                            {LocalStorageUtils.isAuthenticated() &&
                                `(chào ${LocalStorageUtils.getName() ||
                                    "bạn"})`}
                        </Link>
                    </Menu.Item>
                    {LocalStorageUtils.isAuthenticated() && (
                        <Menu.Item key="/logout">
                            <a href="/logout" onClick={e => this.onLogout(e)}>
                                thoát
                            </a>
                        </Menu.Item>
                    )}
                </Menu>
            </Header>
        );
    }
}

export default withRouter(HeaderPage);
