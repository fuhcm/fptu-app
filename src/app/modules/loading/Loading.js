import React, { Component } from "react";

import { Layout, Skeleton } from "antd";

const { Content } = Layout;

class Loading extends Component {
    render() {
        return (
            <Content className="content-container">
                <div
                    style={{
                        background: "#fff",
                        padding: "2rem",
                    }}
                >
                    <Skeleton active paragraph={{ rows: 10 }} />
                </div>
            </Content>
        );
    }
}

export default Loading;
