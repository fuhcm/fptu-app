import React, { PureComponent } from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Icon, Button, notification } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "../../utils/LocalStorage";

const { Header } = Layout;

class HeaderPage extends PureComponent {
    onLogout = e => {
        e.preventDefault();

        LocalStorageUtils.removeItem(LOCAL_STORAGE_KEY.JWT);
        LocalStorageUtils.removeItem(LOCAL_STORAGE_KEY.EMAIL);
        const { history } = this.props;
        history.push("/login");
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
                    history.push("/medium");
                }}
            >
                Ờm, để đọc thử xem
            </Button>
        );

        notification.open({
            message    : "Dành cho các bạn SE",
            description:
                "Tự bổ sung kiến thức cho mình là cách giết thời gian khá tốt. Bạn có thể dễ dàng đọc được những thứ mới, thú vị trên trang news nhé, click vào nút ở dưới để nhảy sang trang đó thử đê",
            btn,
            key,
            duration: 0,
            icon    : <Icon type="coffee" style={{ color: "#108ee9" }} />,
        });
    };

    render() {
        const { history } = this.props;
        if (
            !LocalStorageUtils.isNotificationLoaded() &&
            typeof window !== "undefined" &&
            history.location.pathname === "/send"
        ) {
            this.openNotification();
            LocalStorageUtils.setNotificationLoaded();
        }

        // Handle selected key
        let currentKey = history.location.pathname;
        if (currentKey === "/") {
            currentKey = "/home";
        } else if (currentKey.includes("/fpt")) {
            currentKey = "/home";
        } else if (currentKey.includes("/medium")) {
            currentKey = "/medium";
        } else if (currentKey.includes("/toidicodedao")) {
            currentKey = "/toidicodedao";
        } else if (currentKey.includes("/pentakill")) {
            currentKey = "/pentakill";
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
                        title={(
                            <span>
                                <Icon type="heart" />
                                Confessions
                            </span>
)}
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
                        <Menu.Item key="/search">
                            <Link to="/search">
                                <Icon type="book" />
                                Thư viện confess
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="execption">
                            <a
                                href="https://tinyurl.com/noiquyFPTUHCMCFS"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Icon type="exception" />
                                Quy định
                            </a>
                        </Menu.Item>
                        <Menu.Item key="instagram">
                            <Icon type="instagram" />
                            Instagram
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
                                    Admin CP (
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
                        title={(
                            <span>
                                <Icon type="coffee" />
                                Dev Đọc
                            </span>
)}
                    >
                        <Menu.Item key="/medium">
                            <Link to="/medium">
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

                    <Menu.Item key="source" disabled>
                        <Icon type="key" />
                        Thư viện Source
                    </Menu.Item>
                    <Menu.Item key="forum" disabled>
                        <Icon type="fire" />
                        Diễn đàn ẩn danh
                    </Menu.Item>
                </Menu>
            </Header>
        );
    }
}

export default withRouter(HeaderPage);
