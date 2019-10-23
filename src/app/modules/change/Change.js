import React, { useState, useEffect } from "react";

import Helmet from "react-helmet-async";
import { Icon, Button, Layout, message, Progress, List, Skeleton } from "antd";
import GoogleLogin from "react-google-login";

const { Content } = Layout;

function ChangeForm() {
    const [loading, setLoading] = useState(false);
    const [isSigned, setIsSigned] = useState(false);
    const [signList, setSignList] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        let fake = null;

        setLoading(true);
        FPTUSDK.change
            .getSignList()
            .then(data => {
                setSignList(data.list.map(e => e.email));
                setCount(data.count || 0);

                fake = setInterval(() => {
                    setLoading(true);
                    FPTUSDK.change
                        .getSignList()
                        .then(data => {
                            setSignList(data.list.map(e => e.email));
                            setCount(data.count || 0);
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                }, 5000);
            })
            .finally(() => setLoading(false));

        return () => {
            clearInterval(fake);
        };
    }, []);

    const toggleCreate = () => {
        message.error(
            "Chúng tôi đang làm việc chăm chỉ để ra mắt tính năng này sớm nhất."
        );
    };

    const responseGoogle = data => {
        if (!data || !data.profileObj.email || !data.accessToken) return;

        setLoading(true);

        FPTUSDK.change
            .sign(data.profileObj.email, data.accessToken)
            .then(data => {
                if (!data) {
                    message.error("Đăng nhập không thành công!");
                } else {
                    const { email } = data;

                    setIsSigned(true);

                    message.success(`Cảm ơn bạn ${email} đã kí thành công!`);

                    FPTUSDK.change.getSignList().then(data => {
                        setSignList(data.list.map(e => e.email));
                        setCount(data.count || 0);
                    });
                }
            })
            .catch(() => {
                message.error(
                    "Tài khoản của bạn không hợp lệ để kí hoặc bạn đã kí rồi!"
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Content className="content-container">
            <Helmet>
                <title>
                    Change! Sinh viên trường ĐH FPT đòi lại ổ điện - FUHCM.com
                </title>
            </Helmet>
            <div className="content-wrapper">
                <div
                    style={{
                        maxWidth    : 480,
                        margin      : "auto",
                        marginBottom: "2rem",
                    }}
                >
                    <Button
                        style={{ marginBottom: "1rem" }}
                        type="primary"
                        size="large"
                        icon="plus"
                        onClick={() => toggleCreate()}
                    >
                        Tạo chiến dịch kiến nghị riêng của bạn
                    </Button>
                    <h2>Sinh viên trường ĐH FPT đòi lại ổ điện</h2>
                    <p>
                        Chúng tôi - FPTU HCM Confessions kêu gọi tất cả các bạn
                        sinh viên của FPTU HCM cùng nhau kí tên đồng ý việc lắp
                        ổ điện tại các phòng học để thuận tiện cho việc học tập
                        cũng như việc thi. Lá đơn này nếu đủ 3000 chữ kí chúng
                        tôi sẽ gửi mail cho trường và forward cho các phòng ban
                        và các trưởng phòng ban của trường Đại Học FPT.
                    </p>
                    {!loading && (
                        <p>
                            Đã có
                            {" " + count || 0}
                            {' '}
sinh viên kí
                        </p>
                    )}
                    <Skeleton loading={loading} active>
                        <Progress
                            percent={
                                (count && (count / 3000) * 100).toFixed(2) || 0
                            }
                            status="active"
                        />
                    </Skeleton>
                    {!loading && (
                        <p style={{ marginTop: "5px", textAlign: "right" }}>
                            Còn thiếu 
                            {' '}
                            {3000 - count || 0}
                            {' '}
chữ kí nữa
                        </p>
                    )}
                    {!isSigned && (
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
                                    disabled={loading}
                                >
                                    <Icon type="google" />
                                    Đăng nhập email FPT để kí
                                </Button>
                            )}
                            buttonText="Login with Google "
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                        />
                    )}
                </div>
                <div
                    style={{
                        maxWidth: 480,
                        margin  : "auto",
                    }}
                >
                    <h2>10 sinh viên kí mới nhất</h2>
                    <Skeleton loading={loading} active>
                        <List
                            style={{ maxWidth: 480, margin: "auto" }}
                            size="large"
                            bordered
                            dataSource={signList || []}
                            renderItem={item => <List.Item>{item}</List.Item>}
                        />
                    </Skeleton>
                </div>
            </div>
        </Content>
    );
}

export default ChangeForm;
