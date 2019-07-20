import React, { Component } from "react";

import Helmet from "react-helmet-async";
import { Form, Icon, Input, Button, Checkbox, Layout, message } from "antd";
import LocalStorageUtils from "browser/LocalStorage";
import GoogleLogin from "react-google-login";

const { Content } = Layout;
const FormItem = Form.Item;

class LoginForm extends Component {
    state = {
        loading: false,
    };

    componentDidMount() {
        if (LocalStorageUtils.isAuthenticated()) {
            const { history } = this.props;
            history.push("/admin-cp");
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const { form } = this.props;

        form.validateFields((err, values) => {
            if (!err) {
                this.setState({ loading: true });

                FPTUSDK.authen
                    .basicLogin(values.email, values.password)
                    .then(data => {
                        const { token, nickname } = data;

                        this.setState({ loading: false });
                        this.handleRedirect(token, values.email, nickname);
                    })
                    .catch(() => {
                        this.setState({ loading: false });

                        message.error("Thông tin đăng nhập không chính xác!");
                    });
            }
        });
    };

    responseGoogle = data => {
        if (!data || !data.profileObj.email || !data.accessToken) return;

        this.setState({ loading: true });

        FPTUSDK.authen
            .loginFacebook(data.profileObj.email, data.accessToken)
            .then(data => {
                if (!data) {
                    message.error("Đăng nhập không thành công!");
                } else {
                    const { token, nickname } = data;

                    this.handleRedirect(token, data.email, nickname);
                }
            })
            .catch(() => {
                message.error("Tài khoản của bạn chưa được cấp phép truy cập!");
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    };

    handleRedirect(token, email, nickname) {
        if (token) {
            const { history } = this.props;

            FPTUSDK.authen.saveToken(token, email, nickname);
            message.success(`Chào mừng bợn ${nickname} đã quay lại ahihi`);
            history.push("/admin-cp");
        } else {
            message.error("Thông tin đăng nhập không chính xác!");
        }
    }

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const { loading } = this.state;

        return (
            <Content className="content-container">
                <Helmet>
                    <title>Đăng nhập - FUHCM.com</title>
                </Helmet>
                <div className="content-wrapper">
                    <Form
                        onSubmit={this.handleSubmit}
                        className="login-form"
                        style={{ maxWidth: 480, margin: "auto" }}
                    >
                        <h2>Đăng nhập dành cho admin</h2>
                        <FormItem>
                            {getFieldDecorator("email", {
                                rules: [
                                    {
                                        required: true,
                                        message : "Vui lòng nhập email!",
                                    },
                                ],
                            })(
                                <Input
                                    prefix={(
                                        <Icon
                                            type="user"
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
)}
                                    placeholder="Email"
                                    disabled={loading}
                                />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator("password", {
                                rules: [
                                    {
                                        required: true,
                                        message : "Vui lòng nhập mật khẩu!",
                                    },
                                ],
                            })(
                                <Input
                                    prefix={(
                                        <Icon
                                            type="lock"
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
)}
                                    type="password"
                                    placeholder="Mật khẩu"
                                    disabled={loading}
                                />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                loading={loading}
                            >
                                <Icon type="github" hidden={loading} />
                                Đăng nhập
                            </Button>
                            {getFieldDecorator("remember", {
                                valuePropName: "checked",
                                initialValue : true,
                            })(
                                <Checkbox style={{ float: "right" }}>
                                    Ghi nhớ
                                </Checkbox>
                            )}
                        </FormItem>

                        <GoogleLogin
                            clientId="292520951559-5fqe0olanvlto3bd06bt4u36dqsclnni.apps.googleusercontent.com"
                            render={renderProps => (
                                <Button
                                    type="default"
                                    size="large"
                                    className="login-form-button"
                                    onClick={renderProps.onClick}
                                    style={{
                                        marginTop: "0.5rem",
                                    }}
                                >
                                    <Icon type="google" />
                                    Đăng nhập bằng Google
                                </Button>
                            )}
                            buttonText="Login with Google "
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                        />
                    </Form>
                </div>
            </Content>
        );
    }
}

export default Form.create()(LoginForm);
