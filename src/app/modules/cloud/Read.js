import React, { Component } from "react";

import Exception from "ant-design-pro/lib/Exception";
import { Layout, Button, Icon } from "antd";

import Helmet from "react-helmet-async";

const { Content } = Layout;

class Read extends Component {
    render() {
        return (
            <Content className="content-container">
                <Helmet>
                    <title>Cloud Read - FPTU Tech Insights</title>
                </Helmet>
                <div className="content-wrapper">
                    <div style={{ textAlign: "center" }}>
                        <Exception
                            type="403"
                            title="403"
                            desc="Bạn phải đăng nhập mới xem được nha"
                            actions={(
                                <div>
                                    <Button
                                        type="primary"
                                        size="large"
                                        disabled
                                    >
                                        <Icon type="google" />
                                        Đăng nhập bằng tài khoản @fpt.edu.vn
                                    </Button>
                                </div>
)}
                        />
                    </div>
                </div>
            </Content>
        );
    }
}

export default Read;
