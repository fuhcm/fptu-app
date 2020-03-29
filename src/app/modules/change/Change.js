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
          Change! Kiến nghị hỗ trợ học phí - FUHCM.com
        </title>
        <meta property="og:type" content="article" />
        <meta
          property="og:description"
          content="Sinh viên của FPTU HCM cùng nhau kí tên kêu gọi nhà trường hỗ trợ học phí"
        />
        <meta
          property="og:image"
          content="https://i.imgur.com/1pNWLg6.png"
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
            title="Đơn kiến nghị nhà trường hỗ trợ học phí"
            extra={(
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfwwbMhzU1KPW8H3rdgkLDIEul5B-6H90ChBtLxLYyEvBb2KA/viewform?fbzx=7874155949367152925"
                target="_blank"
                rel="noopener noreferrer"
              >
                Xem
              </a>
)}
            style={{ marginBottom: "1rem" }}
          >
            <p>Đơn kiến nghị bản đầy đủ: <a href={"https://docs.google.com/forms/d/e/1FAIpQLSfwwbMhzU1KPW8H3rdgkLDIEul5B-6H90ChBtLxLYyEvBb2KA/viewform?fbzx=7874155949367152925"} target={"_blank"}>Google Forms</a></p>
            <p>
              Trong tình hình dịch bệnh diễn biến phức tạp, chúng tôi hiểu rằng việc học online là điều bất khả kháng và chúng tôi hoàn toàn chấp nhận. Tuy nhiên chúng tôi cảm thấy rằng, những giá trị mà sinh viên được nhận từ trường trong kì vừa rồi (kì Spring 2020) không thỏa đáng với số tiền mà chúng tôi đã đóng. Cụ thể hơn, học phí 25.300.000VNĐ bao gồm chi phí cho cơ sở vật chất, giáo trình, chi phí vận hành, chi phí giảng dạy của giảng viên và chất lượng đào tạo. Nhưng sự thật trong kì vừa qua, chúng tôi chỉ được đến học tại khuôn viên trường và hưởng đủ các giá trị mà học phí đem lại trong 2 tuần đầu kì (05/01/2020 - 18/01/2020), từ tuần thứ 3 đến tuần thứ 10, chúng tôi chỉ nhận giá trị là giờ dạy của các giảng viên thông qua nền tảng Google Meet và giáo trình. Hơn nữa, chất lượng của quá trình học online này không hiệu quả bằng việc học offline ở trường.
            </p>
            <p>
              Chính vì những lý do trên, chúng tôi xin được đề xuất với quý Ban giám hiệu, Ban đào tạo trường Đại học FPT giảm 30 - 35% học phí cho kì Summer 2020 để tạo điều kiện và động lực cho sinh viên có thể tiếp tục việc học online, cũng như là quá trình theo học tại trường ĐH FPT. Mặc khác, đây cũng là hành động thể hiện sự san sẻ, thấu hiểu của nhà trường dành cho bậc phụ huynh trên con đường nuôi dưỡng và phát triển tài năng của thế hệ trẻ.

            </p>
            <p>
              Bằng cách click vào button bên dưới và đăng nhập vào tài khoản
              email sinh viên ĐH FPT, bạn đã hoàn thành kí vào lá thư kiến nghị
              này.
            </p>
            <p>(Hoặc các bạn có thể điền vào Google Forms <a href={"https://docs.google.com/forms/d/e/1FAIpQLSfwwbMhzU1KPW8H3rdgkLDIEul5B-6H90ChBtLxLYyEvBb2KA/viewform?fbzx=7874155949367152925"} target={"_blank"}>ở đây</a>)</p>
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
                parseInt((count && (count / 1000) * 100).toFixed(2)) || 0
              }
              status="active"
            />
          </Skeleton>
          {false && count && 1000 - count > 0 ? (
            <p style={{ marginTop: "5px", textAlign: "right" }}>
              Còn thiếu
              {' '}
              {1000 - count || 0}
              {' '}
chữ kí nữa!
            </p>
          ) : null}
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
                  Đăng nhập email và kí tên
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
            loading={loading && !signList.length && !signList.length}
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
                  <TimeAgo date={item.createdAt} formatter={formatter} />
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
