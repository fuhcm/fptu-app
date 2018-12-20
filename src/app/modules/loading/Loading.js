import React, { Component } from "react";

import { Layout } from "antd";

const { Content } = Layout;

class Loading extends Component {
    render() {
        return (
            <Content className="content-container">
                <div
                    style={{
                        background: "#fff",
                        padding: "2rem",
                        minHeight: "50vh",
                    }}
                />
            </Content>
        );
    }
}

export default Loading;
