import React, { Component } from "react";

import "./Login.scss";

import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Helmet from "react-helmet-async";
import { Link } from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox, Layout, message } from "antd";
import { get, post } from "../../utils/ApiCaller";
import { AUTH__LOGIN, AUTH__LOGIN_FACEBOOK } from "../../utils/ApiEndpoint";
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "../../utils/LocalStorage";

const { Content } = Layout;
const FormItem = Form.Item;

class LoginForm extends Component {
    componentDidMount() {
        if (LocalStorageUtils.isAuthenticated()) {
            const { history } = this.props;
            history.push("/admin-cp");
        }
    }

    onLogin(email, password, cb) {
        post(AUTH__LOGIN, {
            email,
            password,
        })
            .then(res => {
                cb(res.data);
            })
            .catch(() => {
                cb(null);
            });
    }

    handleSubmit = e => {
        e.preventDefault();
        const { form } = this.props;

        form.validateFields((err, values) => {
            if (!err) {
                this.onLogin(values.email, values.password, data => {
                    if (!data) {
                        message.error("Thông tin đăng nhập không chính xác!");
                    } else {
                        this.handleLogin(
                            data.token,
                            values.email,
                            data.nickname
                        );
                    }
                });
            }
        });
    };

    responseFacebook = data => {
        LocalStorageUtils.setItem(
            LOCAL_STORAGE_KEY.USER_ACCESS_TOKEN,
            data.accessToken
        );

        post(AUTH__LOGIN_FACEBOOK, {
            email: data.email,
            token: data.accessToken,
        })
            .then(res => {
                const { token, nickname } = res.data;

                // Get page_access_token
                get(
                    `https://graph.facebook.com/v3.2/1745366302422769?fields=access_token&access_token=${
                        data.accessToken
                    }`
                ).then(res => {
                    LocalStorageUtils.setItem(
                        LOCAL_STORAGE_KEY.PAGE_ACCESS_TOKEN,
                        res.data.access_token
                    );
                });

                this.handleLogin(token, data.email, nickname);
            })
            .catch(() => {
                message.error(
                    "Bạn phải cấp quyền đăng nhập bằng tài khoản Facebook tư cách là admin fanpage!"
                );
            });
    };

    handleLogin(token, email, nickname) {
        if (token) {
            LocalStorageUtils.setItem(LOCAL_STORAGE_KEY.JWT, token);
            LocalStorageUtils.setItem(LOCAL_STORAGE_KEY.EMAIL, email);
            LocalStorageUtils.setItem(LOCAL_STORAGE_KEY.NICKNAME, nickname);
            const { history } = this.props;
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
                    <h2>Đăng nhập dành cho admin</h2>
                    <Form
                        onSubmit={this.handleSubmit}
                        className="login-form"
                        style={{ maxWidth: 360 }}
                    >
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
                    </Form>

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
                    <div
                        style={{
                            textAlign      : "center",
                            marginTop      : "2rem",
                            backgroundColor: "#414141",
                            color          : "#fff",
                            padding        : "1rem 1rem .2rem 1rem",
                            borderRadius   : "1rem",
                        }}
                    >
                        <img
                            src="/assets/images/golang-react.jpg"
                            alt=""
                            style={{
                                width       : "100%",
                                maxWidth    : "720px",
                                marginBottom: "1rem",
                                borderRadius: ".5rem",
                            }}
                            className="blur"
                        />
                        <p style={{ fontSize: "1rem" }}>
                            Read more tech posts at
                            {" "}
                            <strong>
                                <Link to="/news" style={{ color: "#fff" }}>
                                    fptu.tech/news
                                </Link>
                            </strong>
                        </p>
                    </div>
                </div>
            </Content>
        );
    }
}

const Login = Form.create()(LoginForm);

export default Login;
