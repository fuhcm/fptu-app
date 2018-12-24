import React, { Component } from "react";

import { Layout, Alert, Progress, Divider, Skeleton } from "antd";

import { Helmet } from "react-helmet";

const { Content } = Layout;

class Review extends Component {
    render() {
        return (
            <Content className="content-container">
                <Helmet>
                    <title>Review môn học tại FPTU HCM</title>
                </Helmet>
                <div className="content-wrapper">
                    <h2>Đang xây dựng</h2>
                    <Progress percent={70} status="active" />
                    <Divider />
                    <Alert
                        message="Chuyên trang để anh em vô review và tâm sự về các môn học
                    tại FPTU HCM một cách thoải mái  ẩn danh. Đang xây dựng và sẽ ra mắt vào năm mới 2019."
                        type="info"
                        showIcon
                    />
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                </div>
            </Content>
        );
    }
}

export default Review;
