import React, { Component } from "react";

import { Layout, Spin, Icon } from "antd";

const { Content } = Layout;

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Loading extends Component {
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
                    <Spin indicator={antIcon} />
                </div>
            </Content>
        );
    }
}

export default Loading;
