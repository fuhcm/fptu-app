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
          Change! Thay đổi thời gian và địa điểm lễ tốt nghiệp - FUHCM.com
        </title>
        <meta property="og:type" content="article" />
        <meta
          property="og:description"
          content="Sinh viên của FPTU HCM cùng nhau kí tên kêu gọi nhà trường thay đổi thời gian và địa điểm của buổi lễ tốt nghiệp 2020"
        />
        <meta
          property="og:image"
          content="https://i.imgur.com/j5JKflj.png"
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
            title="Đơn kiến nghị nhà trường thay đổi lễ tốt nghiệp 2020"
            extra={(
              <a
                href="https://fuhcm.com/fpt/5fa4e5a0df963846e29898cd/sinh-vien-phan-doi-le-tot-nghiep-to-chuc-vao-thu-6"
                target="_blank"
                rel="noopener noreferrer"
              >
                Xem
              </a>
            )}
            style={{ marginBottom: "1rem" }}
          >
            <p>
              Cựu sinh viên chúng tôi muốn được dự lễ tốt nghiệp cùng cả gia đình, cựu sinh viên chúng tôi muốn lễ tốt nghiệp được diễn ra vào những ngày cuối tuần
            </p>
            <p>
              Đó là những gì mà hầu hết các bạn Cựu Sinh Viên (CSV) đã ý kiến trong những ngày qua và mong chờ nhà trường trả lời nhưng vẫn không thấy hồi đáp!
            </p>
            <p>
              Trách nhiệm của FPT University HCM trong lễ tốt nghiệp của chúng ta ở đâu khi chúng ta đã hoàn thành trách nhiệm học phí?
            </p>
            <p>
              Là dấu mốc của việc hoàn thành 4 năm ròng rã tại Đại Học, chúng ta đáng lẽ ra phải được hưởng một buổi lễ trang trọng và nhiều cảm xúc cùng với gia đình và bạn bè, cũng như là lúc mà chúng ta có thể gởi những sự tri ân đến các Thầy các Cô đã dạy dỗ chúng ta. Điều kiện lý tưởng nhất sẽ luôn là ngày cuối tuần, khi mà gia đình, bạn bè và cả chúng ta có thể sắp xếp công việc và cùng bên nhau ở giây phút đặc biệt ấy.
            </p>
            <p>
              Nhưng không! 20/11/2020 là thứ 6, là ngày mà mọi người phải đi làm. Nhưng không! Vì hội trường sức chứa có hạn nên chỉ được dẫn theo 01 phụ huynh! Nghe sao thật khó để lựa chọn giữa deadline và và cái lễ ra trường, giữa Bố và Mẹ, ... Nói thẳng ra, bản thân mình không thể để ai ở nhà!
            </p>
            <p>
              Có nhiều bạn cũng sẽ cảm thấy như mình và có cùng mong muốn. Và để làm được điều đó chúng ta phải lên tiếng.
            </p>
            <p>
              Vậy nên mình mong mọi người có thể làm theo các bước sau để có thể truyền đi thông điệp một cách rõ ràng hơn cho Nhà Trường:
            </p>
            <p>
              (1) Kí tên vào chiến dịch kiến nghị này bằng cách đăng nhập vào email trường (@fpt.edu.vn)
            </p>
            <p>
              (2) Cùng viết 1 chiếc mail reply lại mail mời tham gia lễ tốt nghiệp với nội dung mong muốn buổi lễ sẽ diễn ra vào T7 hoặc CN và ở nơi đủ rộng để có thể đưa gia đình theo cùng chung vui.
            </p>
            <p>
              (3) Vào fanpage FPT University HCM và comment vào <a href="https://www.facebook.com/FPTU.HCM/photos/a.360014474037320/3596787310360004">post này</a> với nội dung mong muốn và share lại post kèm hashtag #WeWantGraduationCeremonyWithFamily.
            </p>
            <p>
              Với 3 bước này mình mong là tất cả các CSV có thể có được Lễ tốt nghiệp trọn vẹn nhất. Mong các bạn có thể đồng hành cùng nhau.
            </p>
            <p>
              (từ bài chia sẻ của page <a href="https://www.facebook.com/FPTUHCMReview/posts/111167514135350">FPTUHCMReview</a>)
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
                parseInt((count && (count / 100) * 100).toFixed(2)) || 0
              }
              status="active"
            />
          </Skeleton>
          {count && 100 - count > 0 ? (
            <p style={{ marginTop: "5px", textAlign: "right" }}>
              Còn thiếu
              {' '}
              {100 - count || 0}
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
        <div
          style={{
            maxWidth: 480,
            margin  : "auto",
            padding : "10px",
          }}
        >
          <img style={{ maxWidth: "100%" }} src="https://i.imgur.com/j5JKflj.png" />
        </div>
      </div>
    </Content>
  );
}

export default ChangeForm;
