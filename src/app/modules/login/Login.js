import React, { Component } from "react";

import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Helmet from "react-helmet-async";
import { Form, Icon, Input, Button, Checkbox, Layout, message } from "antd";
import LocalStorageUtils from "browser/LocalStorage";

const { Content } = Layout;
const FormItem = Form.Item;

class LoginForm extends Component {
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
                FPTUSDK.authen.basicLogin(values.email, values.password).then(
                    data => {
                        if (!data) {
                            message.error(
                                "Thông tin đăng nhập không chính xác!"
                            );
                        } else {
                            const { token, nickname } = data;

                            this.handleRedirect(token, values.email, nickname);
                        }
                    }
                );
            }
        });
    };

    responseFacebook = data => {
        FPTUSDK.authen.loginFacebook(data.email, data.accessToken).then(data => {
            if (!data) {
                message.error(
                    "Bạn phải cấp quyền đăng nhập bằng tài khoản Facebook tư cách là admin fanpage!"
                );
            } else {
                const { token, nickname } = data;

                this.handleRedirect(token, data.email, nickname);
            }
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

        return (
            <Content className="content-container">
                <Helmet>
                    <title>Đăng nhập - FPTU Tech Insider</title>
                </Helmet>
                <div className="content-wrapper">
                    <Form
                        onSubmit={this.handleSubmit}
                        className="login-form"
                        style={{ maxWidth: 360, margin: "auto" }}
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
                                />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                            >
                                <Icon type="github" />
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

                        <FacebookLogin
                            appId="505017836663886"
                            autoLoad={false}
                            fields="name,email,picture"
                            scope="pages_show_list,manage_pages,publish_pages"
                            onClick={this.componentClicked}
                            callback={this.responseFacebook}
                            render={renderProps => (
                                <Button
                                    type="primary"
                                    size="large"
                                    className="login-form-button"
                                    onClick={renderProps.onClick}
                                >
                                    <Icon type="facebook" />
                                    Đăng nhập bằng Facebook
                                </Button>
                            )}
                        />
                    </Form>
                </div>
            </Content>
        );
    }
}

export default Form.create()(LoginForm);
