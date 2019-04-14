import React, { Component } from "react";

import {
    Layout,
    Row,
    Button,
    Input,
    Divider,
    Alert,
    Icon,
    Steps,
    message,
} from "antd";
import Helmet from "react-helmet-async";
import { ReCaptcha } from "react-recaptcha-google";

import firebase from "firebase/app";
import "firebase/storage";
import FileUploader from "react-firebase-file-uploader";
import axios from "axios";

const { Content } = Layout;
const { TextArea } = Input;
const Step = Steps.Step;

class Send extends Component {
    state = {
        disabledSendButton: false,
        contentTextarea   : "",
        step              : 0,
        recaptchaToken    : null,
    };

    componentDidMount() {
        if (this.captchaDemo) {
            this.captchaDemo.reset();
        }

        // Init senderID
        FPTUSDK.send.init();
    }

    onLoadRecaptcha = () => {
        if (this.captchaDemo) {
            this.captchaDemo.reset();
        }
    };
    verifyCallback = recaptchaToken => {
        this.setState({
            recaptchaToken,
        });
    };

    handleSend = () => {
        const { contentTextarea, recaptchaToken } = this.state;

        this.setState({ disabledSendButton: true });

        if (!contentTextarea.trim()) {
            message.error("Không có gì để gửi cả");
            this.setState({ disabledSendButton: false, contentTextarea: "" });
            return;
        }

        const pushID = FPTUSDK.push.getPushID();
        FPTUSDK.send
            .sendConfess(contentTextarea.trim(), recaptchaToken, pushID)
            .then(data => {
                if (data) {
                    message
                        .loading("Đang gửi tới admin..", 2.5)
                        .then(() => message.success("Đã gửi rồi đó", 2.5))
                        .then(() =>
                            this.setState({
                                disabledSendButton: false,
                                contentTextarea   : "",
                                step              : 1,
                            })
                        )
                        .then(() =>
                            message.info(
                                "Vui lòng chờ admin xét duyệt, tối đa chờ 2 ngày",
                                2.5
                            )
                        );

                    axios.post(
                        "https://hooks.slack.com/services/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",
                        {
                            text: `${contentTextarea}`,
                        },
                        {
                            headers: {
                                "Content-Type":
                                    "application/x-www-form-urlencoded",
                            },
                        }
                    );
                } else {
                    message.error("Lỗi kết nối nên chưa gửi được");

                    axios.post(
                        "https://hooks.slack.com/services/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",
                        {
                            text: `Có lỗi hệ thống nên chưa gửi được confess! :smiley: Nội dung confess đó là: ${contentTextarea}`,
                        },
                        {
                            headers: {
                                "Content-Type":
                                    "application/x-www-form-urlencoded",
                            },
                        }
                    );

                    this.setState({
                        disabledSendButton: false,
                        contentTextarea   : contentTextarea,
                        step              : 0,
                    });
                }
            });
    };

    handleChangeTextarea = e => {
        e.preventDefault();

        this.setState({
            contentTextarea: e.target.value,
        });
    };

    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

    handleProgress = progress => this.setState({ progress });

    handleUploadError = () => {
        this.setState({ isUploading: false });

        // Need to handle error here - the props
    };

    handleUploadSuccess = filename => {
        const { contentTextarea } = this.state;

        if (typeof window !== "undefined") {
            this.setState({
                progress   : 100,
                isUploading: false,
            });
            firebase
                .storage()
                .ref("fptu.tech")
                .child(filename)
                .getDownloadURL()
                .then(url =>
                    this.setState({
                        avatarURL      : url,
                        contentTextarea:
                            "Link ảnh của bài viết: [" +
                            url +
                            "]\n\n" +
                            contentTextarea,
                    })
                );
        }
    };

    handleStorageRef = () => {
        if (typeof window !== "undefined") {
            return firebase.storage().ref("fptu.tech");
        }

        return null;
    };

    askPermission = () => {
        if (typeof window !== "undefined") {
            const {
                askForPermissionToReceiveNotifications,
            } = require("../../../firebase");

            askForPermissionToReceiveNotifications();
        }
    };

    render() {
        const {
            disabledSendButton,
            contentTextarea,
            step,
            recaptchaToken,
            isUploading,
            progress,
            avatarURL,
        } = this.state;

        return (
            <Content className="content-container">
                <Helmet>
                    <title>
                        Gửi Confesion - FPTU HCM Confession - FPTU Tech Insights
                    </title>
                    <link
                        rel="shortcut icon"
                        href="/assets/images/fptuhcm-confessions.png"
                    />
                </Helmet>
                <div className="content-wrapper">
                    <div
                        style={{
                            textAlign      : "center",
                            marginBottom   : "2rem",
                            backgroundColor: "#000",
                            color          : "#fff",
                            borderRadius   : "10px",
                            padding        : "1rem",
                        }}
                    >
                        <img
                            src="/assets/images/fptuhcm-confessions.png"
                            alt="FPTU HCM Confessions"
                            style={{ maxWidth: "200px" }}
                        />
                        <p style={{ fontSize: "1rem" }}>
                            Fanpage at
                            {" "}
                            <strong>fb.com/FPTUHCMConfessions</strong>
                        </p>
                    </div>
                    <h2>Gửi Confession</h2>

                    <div hidden={step === 0} style={{ marginBottom: "1rem" }}>
                        <Button
                            type="dashed"
                            size="large"
                            shape="round"
                            onClick={this.askPermission}
                        >
                            <Icon type="thunderbolt" />
                            Nhận thông báo đẩy khi được duyệt
                        </Button>
                    </div>

                    <p hidden={step === 0}>
                        Confession của bạn đã được gửi tới admin. Bạn có thể xem
                        các confess đã gửi bằng cách bấm vào nút
                        {" "}
                        <strong>Confess của tui</strong>
                        {' '}
trên thanh menu. Nhấn
                        vào nút
                        <strong> Nhận thông báo đẩy</strong>
, chúng mình sẽ gửi
                        thông báo cho bạn trên trình duyệt ngay khi confess của
                        bạn được duyệt.
                    </p>
                    <p hidden={step === 1}>
                        Bạn đang buồn vì chuyện thất tình? Bạn thấy mình không
                        đủ bản lĩnh để chắp nối tình yêu? Bạn thấy mình liêu
                        xiêu trong vấn đề tình cảm hoặc mối quan hệ của bạn bị
                        kìm hãm bởi những lí do? Và bạn khá đắn đo khi hỏi trực
                        tiếp? Đừng lo vì bây giờ đã có confession nơi bạn có thể
                        thổ lộ mà đố ai biết được.
                    </p>

                    <Steps
                        current={step}
                        style={{ marginTop: "1rem", marginBottom: "2rem" }}
                    >
                        <Step title="Nhập nội dung confess" />
                        <Step title="Chờ duyệt" />
                        <Step title="Được đăng lên page" />
                    </Steps>

                    <div hidden={step === 1}>
                        <TextArea
                            value={contentTextarea}
                            onChange={e => this.handleChangeTextarea(e)}
                            rows={4}
                            placeholder="Baby em trót thích anh rồi đấy này chàng trai đáng yêu... I need to tell you something..."
                            disabled={disabledSendButton}
                            style={{
                                marginRight : "2rem",
                                marginBottom: "1rem",
                            }}
                        />

                        <div style={{ marginBottom: "1rem" }}>
                            {isUploading && (
                                <div style={{ marginBottom: "1rem" }}>
                                    Đợi xíu, đang upload... 
                                    {' '}
                                    {progress}
%
                                </div>
                            )}
                            <div>
                                {avatarURL && (
                                    <img
                                        src={avatarURL}
                                        style={{
                                            maxWidth    : "250px",
                                            marginBottom: "0.5rem",
                                        }}
                                        alt="Upload"
                                    />
                                )}
                            </div>
                            {!avatarURL && (
                                <div>
                                    <span hidden={recaptchaToken}>
                                        <Alert
                                            message="Tick vào reCAPTCHA để hiện khung Upload ảnh"
                                            type="warning"
                                            showIcon
                                        />
                                    </span>
                                    {" "}
                                    <label
                                        htmlFor="avatar"
                                        style={{
                                            backgroundColor: "#1890ff",
                                            color          : "white",
                                            padding        : 10,
                                            borderRadius   : 4,
                                            pointer        : "cursor",
                                        }}
                                        hidden={!recaptchaToken}
                                    >
                                        <FileUploader
                                            accept="image/*"
                                            name="avatar"
                                            randomizeFilename
                                            storageRef={this.handleStorageRef()}
                                            onUploadStart={
                                                this.handleUploadStart
                                            }
                                            onUploadError={
                                                this.handleUploadError
                                            }
                                            onUploadSuccess={
                                                this.handleUploadSuccess
                                            }
                                            onProgress={this.handleProgress}
                                        />
                                    </label>
                                </div>
                            )}
                        </div>

                        <ReCaptcha
                            ref={el => {
                                this.captchaDemo = el;
                            }}
                            size="normal"
                            data-theme="dark"
                            render="explicit"
                            sitekey="6LfM3YgUAAAAAKtd0Yg9dxxFL1dYhbGHUGPJanKL"
                            onloadCallback={this.onLoadRecaptcha}
                            verifyCallback={this.verifyCallback}
                        />

                        <Button
                            type="primary"
                            onClick={this.handleSend}
                            disabled={disabledSendButton || !recaptchaToken}
                            style={{ margin: ".5rem" }}
                        >
                            <Icon type="thunderbolt" />
                            Gửi ngay và luôn!
                        </Button>
                    </div>

                    <Divider dashed />
                    <Row>
                        <Alert
                            message="Làm sao để biết confess tui đã được đăng lên hay chưa? Bị từ chối vì sao?"
                            description="Những confession mà bạn đã đăng sẽ được lưu vào trình duyệt của bạn, duyệt qua menu 'Confess của tui' để xem lại mấy confess đó, ngoài ra bạn cũng sẽ biết được nó được duyệt bởi ai, đăng khi nào, số thứ tự và lí do bị từ chối nếu có."
                            type="info"
                            showIcon
                        />
                    </Row>
                </div>
            </Content>
        );
    }
}

export default Send;
