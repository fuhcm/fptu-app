import React, { Component } from "react";
import "./Send.scss";

import { Layout, Row, Button, Input, Divider, Alert, message } from "antd";
import { post } from "../../utils/ApiCaller";
import { GUEST__POST_CONFESS } from "../../utils/ApiEndpoint";
import LocalStorage from "../../utils/LocalStorage";

const { Content } = Layout;
const { TextArea } = Input;

class Send extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disabledSendButton: false,
            contentTextarea: "",
        };
    }

    handleSend = () => {
        const { contentTextarea } = this.state;

        this.setState({ disabledSendButton: true });

        if (!contentTextarea.trim()) {
            message.error("Không có gì để gửi cả");
            this.setState({ disabledSendButton: false, contentTextarea: "" });
            return;
        }

        this.onSend(contentTextarea.trim()).then(res => {
            if (res.status === "ok") {
                // Save in localStorage
            } else {
                // Not save
            }
        });

        message
            .loading("Đang gửi tới admin..", 2.5)
            .then(() => message.success("Đã gửi rồi đó", 2.5))
            .then(() =>
                this.setState({
                    disabledSendButton: false,
                    contentTextarea: "",
                })
            )
            .then(() =>
                message.info(
                    "Vui lòng chờ admin xét duyệt, tối đa chờ 2 ngày",
                    2.5
                )
            );
    };

    onSend = content => {
        LocalStorage.generateSenderToken();

        return post(GUEST__POST_CONFESS, {
            content,
            sender: LocalStorage.getSenderToken(),
            status: 0,
        })
            .then(res => {
                console.log(res);
                return { status: "ok", message: "" };
            })
            .catch(err => {
                console.log(err);
                return { status: "error", message: err };
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

    render() {
        const { disabledSendButton, contentTextarea } = this.state;

        return (
            <Content className="content-container">
                <div
                    style={{
                        background: "#fff",
                        padding: "2rem",
                        minHeight: 540,
                    }}
                >
                    <h2>Gửi Confession</h2>
                    <p>
                        Bạn đang buồn vì chuyện thất tình? Bạn thấy mình không
                        đủ bản lĩnh để chắp nối tình yêu? Bạn thấy mình liêu
                        xiêu trong vấn đề tình cảm hoặc mối quan hệ của bạn bị
                        kìm hãm bởi những lí do? Và bạn khá đắn đo khi hỏi trực
                        tiếp? Đừng lo vì bây giờ đã có confession nơi bạn có thể
                        thổ lộ mà đố ai biết được.
                    </p>
                    <TextArea
                        value={contentTextarea}
                        onChange={e => this.handleChangeTextarea(e)}
                        rows={4}
                        placeholder="Ghi gì chả được..."
                        disabled={disabledSendButton}
                    />
                    <Divider />
                    <Button
                        type="primary"
                        onClick={this.handleSend}
                        disabled={disabledSendButton}
                        style={{ margin: ".5rem" }}
                    >
                        Gửi liền!
                    </Button>
                    <Button onClick={this.handleUploadHelper}>
                        Làm sao để tui up hình?!
                    </Button>
                    <Divider dashed />
                    <Row>
                        <Alert
                            message="Làm sao để biết confess tui đã được đăng lên hay chưa? Bị từ chối vì sao?"
                            description="Những confession mà bạn đã đăng sẽ được lưu vào trình duyệt của bạn, duyệt qua menu 'confess của tui' để xem lại mấy confess đó, ngoài ra bạn cũng sẽ biết được nó được duyệt bởi ai, đăng khi nào, số thứ tự và lí do bị từ chối nếu có."
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
