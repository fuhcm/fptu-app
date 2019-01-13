import React, { Component } from "react";
import "./Send.scss";

import {
    Layout,
    Row,
    Button,
    Input,
    Divider,
    Alert,
    Upload,
    Icon,
    Steps,
    message,
} from "antd";
import Helmet from "react-helmet-async";
import { ReCaptcha } from "react-recaptcha-google";
import SendService from "service/Send";

const { Content } = Layout;
const { TextArea } = Input;
const Step = Steps.Step;

class Send extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disabledSendButton: false,
            contentTextarea   : "",
            loading           : false,
            imageUrl          : "",
            step              : 0,
            recaptchaToken    : null,
        };
    }

    componentDidMount() {
        if (this.captchaDemo) {
            this.captchaDemo.reset();
        }
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

        SendService(contentTextarea.trim(), recaptchaToken).then(data => {
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
            } else {
                message.error("Lỗi kết nối nên chưa gửi được");

                this.setState({
                    disabledSendButton: false,
                    contentTextarea   : contentTextarea,
                    step              : 0,
                });
            }
        });
    };

    handleUploadHelper = () => {
        message.info(
            "Dễ thôi mà, up đại lên google drive hoặc host up ảnh nào đó rồi dán link ảnh vào"
        );
    };

    handleChangeTextarea = e => {
        e.preventDefault();

        this.setState({
            contentTextarea: e.target.value,
        });
    };

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    beforeUpload = file => {
        const isJPG = file.type === "image/jpeg";
        if (!isJPG) {
            message.error(
                "Bạn chỉ có thể up ảnh JPG thôi, nếu ảnh định dạng khác thì bạn up lên host ảnh khác rồi dán link vào đây!"
            );
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error(
                "Dung lượng ảnh bự vãi, bạn up lên host khác rồi dán link vào đây được không?"
            );
        }
        return isJPG && isLt2M;
    };

    handleChange = info => {
        if (info.file.status === "uploading") {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === "done") {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                })
            );
        }
    };

    render() {
        const {
            disabledSendButton,
            contentTextarea,
            imageUrl,
            step,
            recaptchaToken,
        } = this.state;

        const { loading } = this.state;
        const uploadButton = (
            <div>
                <Icon type={loading ? "loading" : "plus"} />
                <div className="ant-upload-text">Thêm ảnh</div>
            </div>
        );

        return (
            <Content className="content-container">
                <Helmet>
                    <title>
                        Gửi Confesion - FPTU HCM Confession - FPTU Tech Insider
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
                    <p>
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
                                float       : "left",
                                width       : "80%",
                                marginRight : "2rem",
                                marginBottom: "1rem",
                            }}
                        />
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="//jsonplaceholder.typicode.com/posts"
                            beforeUpload={this.beforeUpload}
                            onChange={this.handleChange}
                            disabled
                        >
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt="avatar"
                                    style={{ maxWidth: "100px" }}
                                />
                            ) : (
                                uploadButton
                            )}
                        </Upload>
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
                        <Button onClick={this.handleUploadHelper} dashed>
                            Chức năng upload ảnh đang bị lỗi, up ảnh sao?!
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
