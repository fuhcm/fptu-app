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
  componentDidMount() {
    const { error } = this.props;

    if (
      error === "ReferenceError: FPTUSDK is not defined" ||
      error === "ReferenceError: Can't find variable: FPTUSDK"
    ) {
      message.error("Lỗi bất ngờ xảy ra, chúng tôi sẽ reload lại app!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  report = (): void => {
    message.info("Đã báo công an!");
  };

  render() {
    let { error } = this.props;

    if (
      error === "ReferenceError: FPTUSDK is not defined" ||
      error === "ReferenceError: Can't find variable: FPTUSDK"
    ) {
      error = "Mạng không ổn định, tải thiếu thành phần ứng dụng";
    }

    const msg: string =
      error === "TypeError: grecaptcha.render is not a function"
        ? "Lỗi load captcha, bạn reload lại trang là được nhé!"
        : `Đệt, lỗi "${error}"`;

    return (
      <Content className="content-container">
        <Helmet>
          <title>500 - FUHCM.com</title>
        </Helmet>
        <div
          style={{
            background: "#fff",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <Exception
            type="500"
            actions={
              <Link to="/medium">
                <Button type="primary" onClick={this.report}>
                  Báo cho team Developer!
                </Button>
              </Link>
            }
            title="500"
            desc={msg}
          />
        </div>
      </Content>
    );
  }
}

export default Error;
