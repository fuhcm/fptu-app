import React, { Component } from "react";
import Exception from "ant-design-pro/lib/Exception";
import { Link } from "react-router-dom";

import { Layout, Button } from "antd";

const { Content } = Layout;

class NotFound extends Component {
    render() {
        return (
            <Content className="content-container">
                <div
                    style={{
                        background: "#fff",
                        padding: "2rem",
                        textAlign: "center",
                    }}
                >
                    <Exception
                        type="404"
                        actions={
                            <Link to="/">
                                <Button type="primary">Về trang chủ</Button>
                            </Link>
                        }
                        title="404"
                        desc="Đi chỗ khác đi, méo có trang này ok?"
                    />
                </div>
            </Content>
        );
    }
}

export default NotFound;
