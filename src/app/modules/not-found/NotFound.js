import React, { Component } from "react";
import Exception from "ant-design-pro/lib/Exception";

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
                        actions={<Button type="primary">về trang chủ</Button>}
                        title="404"
                        desc="đi chỗ khác đi, méo có trang này ok?"
                    />
                </div>
            </Content>
        );
    }
}

export default NotFound;
