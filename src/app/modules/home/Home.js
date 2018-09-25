import React, { Component } from 'react';

import { Layout, Breadcrumb } from 'antd';

const { Content } = Layout;

class Home extends Component {
    render() {
        return (
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
            </Content>
        );
    }
}

export default Home;