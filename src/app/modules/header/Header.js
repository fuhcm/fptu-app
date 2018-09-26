import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Layout, Menu } from 'antd';

const { Header } = Layout;

class HeaderPage extends Component {
    render() {
        return (
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1"><Link to='/home'>home</Link></Menu.Item>
                    <Menu.Item key="2"><Link to='/login'>sign in</Link></Menu.Item>
                    <Menu.Item key="3"><Link to='/send'>send</Link></Menu.Item>
                </Menu>
            </Header>
        );
    }
}

export default HeaderPage;