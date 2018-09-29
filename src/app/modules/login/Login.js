import React, { Component } from "react";

import { Form, Icon, Input, Button, Checkbox, Layout } from "antd";

const { Content } = Layout;
const FormItem = Form.Item;

class LoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        // Redirect to AdminCP
        this.props.history.push("/admin-cp");
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Content style={{ padding: "0 50px" }}>
        <div style={{ background: "#fff", padding: "2rem", minHeight: 540 }}>
          <h2>Đăng nhập</h2>
          <Form
            onSubmit={this.handleSubmit}
            className="login-form"
            style={{ maxWidth: 360 }}
          >
            <FormItem>
              {getFieldDecorator("email", {
                rules: [{ required: true, message: "Vui lòng nhập email!" }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Email"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "Vui lòng nhập mật khẩu!" }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Mật khẩu"
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Đăng nhập
              </Button>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox style={{ float: "right" }}>Ghi nhớ</Checkbox>)}
            </FormItem>
          </Form>
        </div>
      </Content>
    );
  }
}

const Login = Form.create()(LoginForm);

export default Login;