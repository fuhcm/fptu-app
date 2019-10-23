import React, { useState, useEffect } from "react";

import Helmet from "react-helmet-async";
import { Icon, Button, Layout, message, Progress, List } from "antd";
import GoogleLogin from "react-google-login";

const { Content } = Layout;

function ChangeForm() {
    const [loading, setLoading] = useState(false);
    const [isSigned, setIsSigned] = useState(false);
    const [signList, setSignList] = useState([]);

    useEffect(() => {
        FPTUSDK.change
            .getSignList()
            .then(data => setSignList(data.map(e => e.email)));
    }, []);

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

                    message.error(`Cảm ơn bạn ${email} đã kí thành công!`);

                    FPTUSDK.change
                        .getSignList()
                        .then(data => setSignList(data.map(e => e.email)));
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
                    <h2>Sinh viên trường ĐH FPT đòi lại ổ điện</h2>
                    <p>
                        Chúng tôi - FPTU HCM Confessions kêu gọi tất cả các bạn
                        sinh viên của FPTU HCM cùng nhau kí tên đồng ý việc lắp
                        ổ điện tại các phòng học để thuận tiện cho việc học tập
                        cũng như việc thi. Lá đơn này nếu đủ (3000) chữ kí chúng
                        tôi sẽ gửi mail cho trường và forward cho các phòng ban
                        và các trưởng phòng ban của trường Đại Học FPT.
                    </p>
                    <p>
                        Đã kêu gọi được:
                        {" "}
                        {(signList.length && signList.length) || 0}
                        /3000 chữ kí
                    </p>
                    <p>
                        <Progress
                            percent={
                                (signList.length &&
                                    Math.round(
                                        (signList.length / 3000) * 100
                                    ).toFixed(2)) ||
                                0
                            }
                            status="active"
                        />
                    </p>
                    {!isSigned && !loading && (
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
                                    Đăng nhập email sinh viên ĐH FPT để kí
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
                    <h2>Danh sách sinh viên kí mới nhất</h2>
                    <List
                        style={{ maxWidth: 480, margin: "auto" }}
                        size="large"
                        bordered
                        dataSource={signList || []}
                        renderItem={item => <List.Item>{item}</List.Item>}
                    />
                </div>
            </div>
        </Content>
    );
}

export default ChangeForm;
