import React, { useState, useEffect } from "react";

import Helmet from "react-helmet-async";
import {
    Icon,
    Button,
    Layout,
    message,
    Progress,
    List,
    Skeleton,
    Card,
} from "antd";
import GoogleLogin from "react-google-login";

import TimeAgo from "react-timeago";
import viStrings from "react-timeago/lib/language-strings/vi";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

const { Content } = Layout;

const formatter = buildFormatter(viStrings);

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
                setSignList(data.list);
                setCount(data.count || 0);

                fake = setInterval(() => {
                    setLoading(true);
                    FPTUSDK.change
                        .getSignList()
                        .then(data => {
                            setSignList(data.list);
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
                        setSignList(data.list);
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
                    Change! Sinh viên trường ĐH FPT đòi lại ổ điện - Save Your
                    Laptop, Save your Exam! - FUHCM.com
                </title>
                <meta property="og:type" content="article" />
                <meta
                    property="og:description"
                    content="Sinh viên của FPTU HCM cùng nhau kí tên đồng ý việc lắp ổ điện tại các phòng học để thuận tiện cho việc học tập cũng như việc thi."
                />
                <meta
                    property="og:image"
                    content="https://scontent.fsgn5-7.fna.fbcdn.net/v/t1.0-9/72853199_2202083860084342_4602527138107621376_o.png?_nc_cat=103&_nc_oc=AQnfXl42YF8HozcMg4XqbJbSFH_nTdYal7IkSJ-Kv_SKR0WDJcwqOZEt7I6gSVE47aM&_nc_ht=scontent.fsgn5-7.fna&oh=6578155d6be382dbf2e5bb89c6bd26dd&oe=5E5FD643"
                />
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
                        Tạo chiến dịch kiến nghị
                    </Button>
                    <Card
                        title="Save Your Laptop, Save your Exam!"
                        extra={(
                            <a
                                href="https://facebook.com/FPTUHCMConfessions/photos/a.1745593425733390/2202083856751009/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Xem
                            </a>
)}
                        style={{ marginBottom: "1rem" }}
                    >
                        <p>
                            Chúng tôi - FPTU HCM Confessions kêu gọi tất cả các
                            bạn sinh viên của FPTU HCM cùng nhau kí tên đồng ý
                            việc lắp ổ điện tại các phòng học để thuận tiện cho
                            việc học tập cũng như việc thi.
                        </p>
                        <p>
                            Lá đơn này nếu đủ 3000 chữ kí chúng tôi sẽ gửi mail
                            cho trường và forward cho các phòng ban và các
                            trưởng phòng ban của trường Đại Học FPT.
                        </p>
                        <p>
                            Bằng cách click vào button bên dưới và đăng nhập vào
                            tài khoản email sinh viên ĐH FPT, bạn đã hoàn thành
                            kí vào lá thư kiến nghị này.
                        </p>
                    </Card>
                    <p>
                        Đã có
                        {" " + count || 0}
                        {' '}
sinh viên kí
                    </p>

                    <Skeleton loading={loading && !signList.length} active>
                        <Progress
                            percent={
                                (count && (count / 3000) * 100).toFixed(2) || 0
                            }
                            status="active"
                        />
                    </Skeleton>
                    <p style={{ marginTop: "5px", textAlign: "right" }}>
                        Còn thiếu 
                        {' '}
                        {3000 - count || 0}
                        {' '}
chữ kí nữa!
                    </p>
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
                                    disabled={loading && !signList.length}
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
                    <Skeleton
                        loading={
                            loading && !signList.length && !signList.length
                        }
                        active
                    >
                        <List
                            style={{ maxWidth: 480, margin: "auto" }}
                            size="large"
                            bordered
                            dataSource={signList || []}
                            renderItem={item => (
                                <List.Item>
                                    <strong>{item.email}</strong>
                                    {" "}
                                    <TimeAgo
                                        date={item.createdAt}
                                        formatter={formatter}
                                    />
                                </List.Item>
                            )}
                        />
                    </Skeleton>
                </div>
            </div>
        </Content>
    );
}

export default ChangeForm;
