import React, { Component } from "react";

import { Layout } from "antd";

const { Content } = Layout;

class Loading extends Component {
    render() {
        return (
            <Content className="content-container">
                <div className="content-wrapper" />
            </Content>
        );
    }
}

export default Loading;
