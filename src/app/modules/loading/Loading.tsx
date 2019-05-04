import React, { Component } from "react";

import { Layout, Skeleton } from "antd";

const { Content } = Layout;

class Loading extends Component<{}> {
    render() {
        return (
            <Content className="content-container">
                <div className="content-wrapper">
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                </div>
            </Content>
        );
    }
}

export default Loading;
