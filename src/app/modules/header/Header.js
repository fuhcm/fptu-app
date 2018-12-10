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
                Got It!
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
        if (
            !LocalStorageUtils.isNotificationLoaded() &&
            typeof window !== "undefined" &&
            this.props.history.location.pathname === "/send"
        ) {
            this.openNotification();
            LocalStorageUtils.setNotificationLoaded();
        }

        // Handle selected key
        let currentKey = this.props.history.location.pathname;
        if (currentKey === "/") {
            currentKey = "/home";
        } else if (currentKey === "/admin-c[") {
            currentKey = "/login";
        } else if (currentKey.includes("/post")) {
            currentKey = "/news";
        }

        return (
            <Header>
                <Menu
                    theme="light"
                    mode="horizontal"
                    style={{ lineHeight: "64px" }}
                    selectedKeys={[currentKey]}
                >
                    <Menu.Item key="/home">
                        <Link to="/">
                            <Icon type="home" />
                            Trang chủ
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="/news">
                        <Link to="/news">
                            <Icon type="medium" />
                            Medium for Devs
                        </Link>
                    </Menu.Item>

                    {!LocalStorageUtils.isAuthenticated() && (
                        <Menu.Item key="/send">
                            <Link to="/send">
                                <Icon type="mail" />
                                Gửi confess
                            </Link>
                        </Menu.Item>
                    )}

                    {!LocalStorageUtils.isAuthenticated() && (
                        <Menu.Item key="/my-confess">
                            <Link to="/my-confess">
                                <Icon type="folder" />
                                Confess của tui
                            </Link>
                        </Menu.Item>
                    )}

                    {!LocalStorageUtils.isAuthenticated() && (
                        <Menu.Item key="/login">
                            <Link to="/admin-cp">
                                <Icon type="github" />
                                Admin CP
                            </Link>
                        </Menu.Item>
                    )}
                    {LocalStorageUtils.isAuthenticated() && (
                        <Menu.Item key="/admin-cp">
                            <Link to="/admin-cp">
                                <Icon type="github" />
                                Admin CP (chào{" "}
                                <strong>
                                    {LocalStorageUtils.getNickName()}
                                </strong>
                                )
                            </Link>
                        </Menu.Item>
                    )}
                    {LocalStorageUtils.isAuthenticated() && (
                        <Menu.Item key="/logout">
                            <a href="/logout" onClick={e => this.onLogout(e)}>
                                Thoát
                            </a>
                        </Menu.Item>
                    )}
                </Menu>
            </Header>
        );
    }
}

export default withRouter(HeaderPage);
