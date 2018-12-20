import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "../../utils/LocalStorage";
import { Layout, Menu, Icon, Button, notification } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";

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
                onClick={() => {
                    const { history } = this.props;
                    notification.close(key);
                    history.push("/news");
                }}
            >
                Ờm, để đọc thử xem
            </Button>
        );

        notification.open({
            message: "Dành cho các bạn SE",
            description:
                "Tự bổ sung kiến thức cho mình là cách giết thời gian khá tốt. Bạn có thể dễ dàng đọc được những thứ mới, thú vị trên trang news nhé, click vào nút ở dưới để nhảy sang trang đó thử đê",
            btn,
            key,
            duration: 0,
            icon: <Icon type="coffee" style={{ color: "#108ee9" }} />,
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
        } else if (currentKey.includes("/toidicodedao")) {
            currentKey = "/toidicodedao";
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

                    <SubMenu
                        title={
                            <span>
                                <Icon type="heart" />
                                Confessions
                            </span>
                        }
                    >
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
                        <Menu.Item key="/blame">
                            <Link to="/blame">
                                <Icon type="facebook" />
                                Blame FPTU
                            </Link>
                        </Menu.Item>
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
                                <a
                                    href="/logout"
                                    onClick={e => this.onLogout(e)}
                                >
                                    <Icon type="delete" />
                                    Thoát khỏi tài khoản
                                </a>
                            </Menu.Item>
                        )}
                    </SubMenu>

                    <SubMenu
                        title={
                            <span>
                                <Icon type="coffee" />
                                Dev Đọc
                            </span>
                        }
                    >
                        <Menu.Item key="/news">
                            <Link to="/news">
                                <Icon type="medium" />
                                Medium cho Dev
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="/toidicodedao">
                            <Link to="/toidicodedao">
                                <Icon type="laptop" />
                                Tôi đi code dạo
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Header>
        );
    }
}

export default withRouter(HeaderPage);
