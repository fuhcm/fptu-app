import React, { Component } from "react";
import Exception from "ant-design-pro/lib/Exception";
import { Link } from "react-router-dom";

import { Layout, Button, message } from "antd";

import Helmet from "react-helmet-async";

const { Content } = Layout;

type Props = {
    error: string;
};

class Error extends Component<Props> {
    report = (): void => {
        message.info("Đã báo công an!");
    };

    render() {
        const { error } = this.props;

        const msg: string =
            error === "TypeError: grecaptcha.render is not a function"
                ? "Lỗi load captcha, bạn reload lại trang là được nhé!"
                : `Đệt, lỗi "${error}"`;

        return (
            <Content className="content-container">
                <Helmet>
                    <title>500 - FPTU Tech Insights</title>
                </Helmet>
                <div
                    style={{
                        background: "#fff",
                        padding   : "2rem",
                        textAlign : "center",
                    }}
                >
                    <Exception
                        type="500"
                        actions={(
                            <Link to="/medium">
                                <Button type="primary" onClick={this.report}>
                                    Báo cho team Developer!
                                </Button>
                            </Link>
)}
                        title="500"
                        desc={msg}
                    />
                </div>
            </Content>
        );
    }
}

export default Error;
