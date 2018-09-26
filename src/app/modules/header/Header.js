import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import { Layout, Menu, Icon } from 'antd';

const { Header } = Layout;

class HeaderPage extends Component {
    render() {
        return (
            <Header>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1"><Link to='/home'><Icon type="home" />trang chủ</Link></Menu.Item>
                    <Menu.Item key="2"><Link to='/login'><Icon type="login" />admin</Link></Menu.Item>
                    <Menu.Item key="3"><Link to='/send'><Icon type="mail" />gửi confess</Link></Menu.Item>
                    <Menu.Item key="4"><Link to='/my-confess'><Icon type="folder" />confess của tui</Link></Menu.Item>
                </Menu>
            </Header>
        );
    }
}

export default HeaderPage;