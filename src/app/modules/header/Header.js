import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Header.scss";
import { get, post } from "../../utils/ApiCaller";
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "../../utils/LocalStorage";
import { AUTH__LOGIN_FACEBOOK } from "../../utils/ApiEndpoint";
import { Layout, Menu, Icon, Button, notification, message } from "antd";

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

    responseFacebook = data => {
        LocalStorageUtils.setItem(
            LOCAL_STORAGE_KEY.USER_ACCESS_TOKEN,
            data.accessToken
        );

        post(AUTH__LOGIN_FACEBOOK, {
            email: data.email,
            token: data.accessToken,
        })
            .then(res => {
                const token = res.data.token;
                const nickname = res.data.nickname;

                // Get page_access_token
                get(
                    `https://graph.facebook.com/v3.2/1745366302422769?fields=access_token&access_token=${
                        data.accessToken
                    }`
                ).then(res => {
                    LocalStorageUtils.setItem(
                        LOCAL_STORAGE_KEY.PAGE_ACCESS_TOKEN,
                        res.data.access_token
                    );
                });

                this.handleLogin(token, data.email, nickname);
            })
            .catch(err => {
                message.error("Không có quyền truy cập trang này!");
            });
    };

    handleLogin(token, email, nickname) {
        if (token) {
            LocalStorageUtils.setItem(LOCAL_STORAGE_KEY.JWT, token);
            LocalStorageUtils.setItem(LOCAL_STORAGE_KEY.EMAIL, email);
            LocalStorageUtils.setItem(LOCAL_STORAGE_KEY.NICKNAME, nickname);
            this.props.history.push("/admin-cp");
        } else {
            message.error("Thông tin đăng nhập không chính xác!");
        }
    }

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
                            Trang chủ
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
                    <Menu.Item key="/faq">
                        <Link to="/faq">
                            <Icon type="question" />
                            Hỏi đáp
                        </Link>
                    </Menu.Item>

                    {!LocalStorageUtils.isAuthenticated() && (
                        <Menu.Item>
                            <Link to="/admin-cp">
                                <Button type="primary" size="large">
                                    <Icon type="facebook" />
                                    Admin CP
                                </Button>
                            </Link>
                        </Menu.Item>
                    )}
                    {LocalStorageUtils.isAuthenticated() && (
                        <Menu.Item key="/admin-cp">
                            <Link to="/admin-cp">
                                <Icon type="dashboard" />
                                Admin CP
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
