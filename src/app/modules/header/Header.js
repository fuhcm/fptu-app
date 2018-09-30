import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Header.css";

import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "../../utils/LocalStorage";

import { Layout, Menu, Icon } from "antd";

const { Header } = Layout;

class HeaderPage extends Component {
    onLogout = () => {
        LocalStorageUtils.removeItem(LOCAL_STORAGE_KEY.JWT);
        this.props.history.push("/login");
    };

    render() {
        return (
            <Header>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{ lineHeight: "64px" }}
                >
                    <Menu.Item key="/home">
                        <Link to="/home">
                            <Icon type="home" />
                            trang chủ
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/admin-cp">
                        <Link to="/admin-cp">
                            <Icon type="login" />
                            admin {LocalStorageUtils.isAuthenticated() && `(chào ${LocalStorageUtils.getName() || "bạn"})`}
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/send">
                        <Link to="/send">
                            <Icon type="mail" />
                            gửi confess
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/my-confess">
                        <Link to="/my-confess">
                            <Icon type="folder" />
                            confess của tui
                        </Link>
                    </Menu.Item>
                    {LocalStorageUtils.isAuthenticated() && (
                        <Menu.Item key="/logout">
                            <a onClick={() => this.onLogout()}>thoát</a>
                        </Menu.Item>
                    )}
                </Menu>
            </Header>
        );
    }
}

export default withRouter(HeaderPage);
