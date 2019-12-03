import React, { useState, useEffect } from "react";

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

const { Content } = Layout;
const { TextArea } = Input;
const Step = Steps.Step;

function Send() {
  const [disabledSendButton, setDisabledSendButton] = useState(false);
  const [contentTextarea, setContentTextarea] = useState(null);
  const [step, setStep] = useState(0);
  const [captchaDemo, setCaptchaDemo] = useState(null);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [avatarURL, setAvatarURL] = useState(null);

  useEffect(() => {
    if (captchaDemo) {
      captchaDemo.reset();
    }

    // Init senderID
    FPTUSDK.send.init();
  }, []);

  const onLoadRecaptcha = () => {
    if (captchaDemo) {
      captchaDemo.reset();
    }
  };

  const verifyCallback = recaptchaToken => {
    setRecaptchaToken(recaptchaToken);
  };

  const handleSend = () => {
    setDisabledSendButton(true);

    if (!contentTextarea || !contentTextarea.trim()) {
      message.error("Không có gì để gửi cả");
      setDisabledSendButton(false);
      setContentTextarea("");
      setDisabledSendButton(false);
      return;
    }

    if (contentTextarea.toLowerCase().includes("unihouse")) {
      setDisabledSendButton(false);
      setContentTextarea("");
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
            .then(() => {
              setDisabledSendButton(false);
              setContentTextarea("");
              setStep(1);
            })
            .then(() =>
              message.info(
                "Vui lòng chờ admin xét duyệt, tối đa chờ 2 ngày",
                2.5
              )
            );
        } else {
          message.error("Lỗi kết nối nên chưa gửi được");

          setDisabledSendButton(false);
          setContentTextarea(contentTextarea);
          setStep(0);
        }
      })
      .catch(() => {
        message.error("Lỗi kết nối nên chưa gửi được");

        setDisabledSendButton(false);
      });
  };

  const handleChangeTextarea = e => {
    e.preventDefault();
    setContentTextarea(e.target.value);
  };

  const handleUploadStart = () => {
    setIsUploading(true);
    setProgress(0);
  };

  const handleProgress = progress => setProgress(progress);

  const handleUploadError = () => {
    setIsUploading(false);

    // Need to handle error here - the props
  };

  const handleUploadSuccess = filename => {
    if (typeof window !== "undefined") {
      setProgress(100);
      setIsUploading(false);

      firebase
        .storage()
        .ref("fuhcm.com")
        .child(filename)
        .getDownloadURL()
        .then(url => {
          setAvatarURL(url);
          setContentTextarea(
            "Link ảnh của bài viết: [" + url + "]\n\n" + contentTextarea
          );
        });
    }
  };

  const handleStorageRef = () => {
    if (typeof window !== "undefined") {
      return firebase.storage().ref("fuhcm.com");
    }

    return null;
  };

  const askPermission = () => {
    if (typeof window !== "undefined") {
      const {
        askForPermissionToReceiveNotifications,
      } = require("../../../firebase");

      askForPermissionToReceiveNotifications().then(() => {
        message.success(
          "Được rồi, bạn sẽ nhận được notification khi confession được duyệt nhé!"
        );
      });
    }
  };

  return (
    <Content className="content-container">
      <Helmet>
        <title>Gửi Confesion - FPTU HCM Confession - FUHCM.com</title>
      </Helmet>
      <div className="content-wrapper">
        <h2>Gửi Confession</h2>

        <div hidden={step === 0} style={{ marginBottom: "1rem" }}>
          <Button
            type="dashed"
            size="large"
            shape="round"
            onClick={askPermission}
          >
            <Icon type="thunderbolt" />
            Nhận thông báo đẩy
          </Button>
        </div>

        <p hidden={step === 0}>
          Confession của bạn đã được gửi tới admin. Bạn có thể xem các confess
          đã gửi bằng cách bấm vào nút 
          {' '}
          <strong>Confess của tui</strong>
          {' '}
trên
          thanh menu. Nhấn vào nút
          <strong> Nhận thông báo đẩy</strong>
, chúng mình sẽ gửi thông báo cho
          bạn trên trình duyệt ngay khi confess của bạn được duyệt.
        </p>
        <p hidden={step === 1}>
          Bạn đang buồn vì chuyện thất tình? Bạn thấy mình không đủ bản lĩnh để
          chắp nối tình yêu? Bạn thấy mình liêu xiêu trong vấn đề tình cảm hoặc
          mối quan hệ của bạn bị kìm hãm bởi những lí do? Và bạn khá đắn đo khi
          hỏi trực tiếp? Đừng lo vì bây giờ đã có confession nơi bạn có thể thổ
          lộ mà đố ai biết được.
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
            onChange={e => handleChangeTextarea(e)}
            rows={8}
            placeholder="Viết nội dung confession ở đây..."
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
                    message="Tick vào I'm not a Robot để hiện khung Upload ảnh"
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
                    storageRef={handleStorageRef()}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadSuccess}
                    onProgress={handleProgress}
                  />
                </label>
              </div>
            )}
          </div>

          <ReCaptcha
            ref={el => setCaptchaDemo(el)}
            size="normal"
            data-theme="dark"
            render="explicit"
            sitekey="6LfM3YgUAAAAAKtd0Yg9dxxFL1dYhbGHUGPJanKL"
            onloadCallback={onLoadRecaptcha}
            verifyCallback={verifyCallback}
          />

          <Button
            type="primary"
            onClick={handleSend}
            disabled={disabledSendButton || !recaptchaToken || !contentTextarea}
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

export default Send;
