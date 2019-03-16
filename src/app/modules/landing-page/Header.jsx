import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { Row, Col, Icon, Menu, Button, Popover } from "antd";

import { enquireScreen } from "enquire-js";

class Header extends React.Component {
    state = {
        menuVisible: false,
        menuMode   : "horizontal",
    };

    componentDidMount() {
        enquireScreen(b => {
            this.setState({ menuMode: b ? "inline" : "horizontal" });
        });
    }

    render() {
        const { menuMode, menuVisible } = this.state;

        const menu = (
            <Menu
                mode={menuMode}
                defaultSelectedKeys={["home"]}
                id="nav"
                key="nav"
            >
                <Menu.Item key="home">
                    <Link to="/">Trang chính</Link>
                </Menu.Item>
                <Menu.Item key="docs">
                    <Link to="/search">
                        <span>Thư viện Confessions</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="components">
                    <Link to="/login">AdminCP</Link>
                </Menu.Item>
                {menuMode === "inline" && (
                    <Menu.Item key="preview">
                        <a
                            target="_blank"
                            href="https://www.facebook.com/FPTUHCMConfessions/"
                            rel="noopener noreferrer"
                        >
                            Facebook Fan Page
                        </a>
                    </Menu.Item>
                )}
            </Menu>
        );

        return (
            <div id="header" className="header">
                {menuMode === "inline" ? (
                    <Popover
                        overlayClassName="popover-menu"
                        placement="bottomRight"
                        content={menu}
                        trigger="click"
                        visible={menuVisible}
                        arrowPointAtCenter
                        onVisibleChange={this.onMenuVisibleChange}
                    >
                        <Icon
                            className="nav-phone-icon"
                            type="menu"
                            onClick={this.handleShowMenu}
                        />
                    </Popover>
                ) : null}
                <Row>
                    <Col xxl={20} xl={19} lg={16} md={16} sm={0} xs={0}>
                        <div className="header-meta">
                            <div id="preview">
                                <a
                                    id="preview-button"
                                    target="_blank"
                                    href="https://www.facebook.com/FPTUHCMConfessions/"
                                    rel="noopener noreferrer"
                                >
                                    <Button icon="facebook">
                                        Facebook Fan Page
                                    </Button>
                                </a>
                            </div>
                            {menuMode === "horizontal" ? (
                                <div id="menu">{menu}</div>
                            ) : null}
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Header;
