import React, { useState, useEffect } from "react";

import Helmet from "react-helmet-async";
import { Form, Icon, Input, Button, Checkbox, Layout, message } from "antd";
import LocalStorageUtils from "@utils/browser/LocalStorage";
import GoogleLogin from "react-google-login";

const { Content } = Layout;
const FormItem = Form.Item;

function LoginForm({ form, history }) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (LocalStorageUtils.isAuthenticated()) {
            history.push("/admin-cp");
        }
    }, []);

    const handleSubmit = e => {
        e.preventDefault();

        form.validateFields((err, values) => {
            if (!err) {
                setLoading(true);

                FPTUSDK.authen
                    .basicLogin(values.email, values.password)
                    .then(data => {
                        const { token, nickname } = data;
                        handleRedirect(token, values.email, nickname);
                    })
                    .catch(() => {
                        message.error("Thông tin đăng nhập không chính xác!");
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        });
    };

    const responseGoogle = data => {
        if (!data || !data.profileObj.email || !data.accessToken) return;

        setLoading(true);

        FPTUSDK.authen
            .loginGoogle(data.profileObj.email, data.accessToken)
            .then(data => {
                if (!data) {
                    message.error("Đăng nhập không thành công!");
                } else {
                    const { token, nickname } = data;
                    handleRedirect(token, data.email, nickname);
                }
            })
            .catch(() => {
                message.error("Tài khoản của bạn chưa được cấp phép truy cập!");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    function handleRedirect(token, email, nickname) {
        if (token) {
            FPTUSDK.authen.saveToken(token, email, nickname);
            message.success(`Chào mừng bợn ${nickname} đã quay lại ahihi`);
            history.push("/admin-cp");
        } else {
            message.error("Thông tin đăng nhập không chính xác!");
        }
    }

    const { getFieldDecorator } = form;

    return (
        <Content className="content-container">
            <Helmet>
                <title>Đăng nhập - FUHCM.com</title>
            </Helmet>
            <div className="content-wrapper">
                <Form
                    onSubmit={handleSubmit}
                    className="login-form"
                    style={{ maxWidth: 480, margin: "auto" }}
                >
                    <h2>Đăng nhập</h2>
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
                            <Icon type="login" hidden={loading} />
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
                        clientId="834798810236-ok8culnaru4ml7fanhjni43lr5i709jj.apps.googleusercontent.com"
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
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                    />
                </Form>
            </div>
        </Content>
    );
}

export default Form.create()(LoginForm);
