/* eslint-disable */
import React, { useState, useEffect } from "react";
import "./Header.scss";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Icon, Button, notification, Drawer } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import LocalStorageUtils, {
  LOCAL_STORAGE_KEY,
} from "@utils/browser/LocalStorage";
import styled from "styled-components";
import { enquireScreen } from "enquire-js";

const MenuItemGroup = Menu.ItemGroup;

const MobileStyle = styled.div`
  .nav-phone-icon {
    cursor: pointer;
    display: none;
    height: 22px;
    position: absolute;
    left: 20px;
    top: 25px;
    width: 16px;
    z-index: 1;
  }

  .nav-phone-icon {
    display: block;
  }

  .nav-phone-icon::before {
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 6px 0 0 #fff, 0 12px 0 0 #fff;
    content: "";
    display: block;
    height: 2px;
    position: absolute;
    width: 20px;
  }
`;

const { Header } = Layout;

function openNotification() {
  const key = `open${Date.now()}`;
  const btn = (
    <Button
      type="primary"
      size="small"
      onClick={() => {
        notification.close(key);
        history.push("/medium");
      }}
    >
      Ờm, để đọc thử xem
    </Button>
  );

  notification.open({
    message: "Dành cho các bạn SE",
    description:
      "Tự bổ sung kiến thức cho mình là cách giết thời gian khá tốt. Bạn có thể dễ dàng đọc được những thứ mới, thú vị trên trang news nhé, click vào nút ở dưới để nhảy sang trang đó thử đê",
    btn,
    key,
    duration: 0,
    icon: <Icon type="coffee" style={{ color: "#108ee9" }} />,
  });
}

function HeaderPage({ history }) {
  const [desktop, setDesktop] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    enquireScreen(b => setDesktop(b ? false : true));
  }, []);

  const onToggleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const onLogout = e => {
    e.preventDefault();
    LocalStorageUtils.removeItem(LOCAL_STORAGE_KEY.JWT);
    LocalStorageUtils.removeItem(LOCAL_STORAGE_KEY.EMAIL);
    history.push("/login");
  };

  if (typeof window === "undefined") {
    return <React.Fragment />;
  }

  if (
    !LocalStorageUtils.isNotificationLoaded() &&
    typeof window !== "undefined" &&
    history.location.pathname === "/send"
  ) {
    openNotification();
    LocalStorageUtils.setNotificationLoaded();
  }

  // Handle selected key
  let currentKey = history.location.pathname;
  if (currentKey === "/") {
    currentKey = "/home";
  } else if (currentKey.includes("/fpt")) {
    currentKey = "/home";
  } else if (currentKey.includes("/medium")) {
    currentKey = "/medium";
  } else if (currentKey.includes("/toidicodedao")) {
    currentKey = "/toidicodedao";
  }

  // is Radio
  const isRadio = location.pathname === "/radio" ? true : false;

  return (
    <React.Fragment>
      {!desktop && !isRadio && (
        <MobileStyle>
          <span className="nav-phone-icon" onClick={onToggleMobileMenu} />

          <Drawer
            placement="left"
            onClose={onToggleMobileMenu}
            visible={mobileMenu}
            closable={false}
          >
            <Menu
              theme="dark"
              mode="inline"
              style={{ width: "100%", border: 0 }}
              onClick={onToggleMobileMenu}
            >
              <Menu.Item key="/home">
                <Link to="/home">
                  <Icon type="home" />
                  Trang chủ
                </Link>
              </Menu.Item>

              <MenuItemGroup key="confess-group" title="Confessions">
                {!LocalStorageUtils.isAuthenticated() && (
                  <Menu.Item key="/send">
                    <Link to="/send">
                      <Icon type="mail" />
                      Gửi confess
                    </Link>
                  </Menu.Item>
                )}
                <Menu.Item key="/radio">
                  <Link to="/radio">
                    <Icon type="customer-service" />
                    Radio
                  </Link>
                </Menu.Item>
                {!LocalStorageUtils.isAuthenticated() && (
                  <Menu.Item key="/my-confess">
                    <Link to="/my-confess">
                      <Icon type="folder" />
                      Confess của tui
                    </Link>
                  </Menu.Item>
                )}
                <Menu.Item key="/search">
                  <Link to="/search">
                    <Icon type="book" />
                    Thư viện confess
                  </Link>
                </Menu.Item>
                {!LocalStorageUtils.isAuthenticated() && (
                  <Menu.Item key="/login">
                    <Link to="/admin-cp">
                      <Icon type="github" />
                      Admin CP
                    </Link>
                  </Menu.Item>
                )}
                {LocalStorageUtils.isAuthenticated() && (
                  <Menu.Item key="/admin-cp">
                    <Link to="/admin-cp">
                      <Icon type="github" />
                      Admin CP (
                      <strong>{LocalStorageUtils.getNickName()}</strong>)
                    </Link>
                  </Menu.Item>
                )}
                {LocalStorageUtils.isAuthenticated() && (
                  <Menu.Item key="/new">
                    <Link to="/new">
                      <Icon type="plus" />
                      Viết bài mới
                    </Link>
                  </Menu.Item>
                )}
                {LocalStorageUtils.isAuthenticated() && (
                  <Menu.Item key="/logout">
                    <a href="/logout" onClick={e => onLogout(e)}>
                      <Icon type="delete" />
                      Thoát
                    </a>
                  </Menu.Item>
                )}
                <Menu.Item key="/change">
                  <Link to="/change">
                    <Icon type="fire" />
                    Change!
                  </Link>
                </Menu.Item>
              </MenuItemGroup>

              <MenuItemGroup key="dev-group" title="Dev Đọc">
                <Menu.Item key="/medium">
                  <Link to="/medium">
                    <Icon type="medium" />
                    Medium cho Dev
                  </Link>
                </Menu.Item>

                <Menu.Item key="/toidicodedao">
                  <Link to="/toidicodedao">
                    <Icon type="laptop" />
                    Tôi đi code dạo
                  </Link>
                </Menu.Item>
              </MenuItemGroup>
            </Menu>
          </Drawer>
        </MobileStyle>
      )}
      {desktop && (
        <Header
          style={{
            background: isRadio ? "rgb(250, 235, 202)" : "unset",
          }}
        >
          <Menu
            theme="light"
            mode="horizontal"
            style={{ lineHeight: "64px" }}
            selectedKeys={[currentKey]}
          >
            <Menu.Item key="/home">
              <Link to="/home">
                <Icon type="home" />
                Trang chủ
              </Link>
            </Menu.Item>

            <SubMenu
              title={
                <span>
                  <Icon type="heart" />
                  Confessions
                </span>
              }
            >
              {!LocalStorageUtils.isAuthenticated() && (
                <Menu.Item key="/send">
                  <Link to="/send">
                    <Icon type="mail" />
                    Gửi confess
                  </Link>
                </Menu.Item>
              )}
              {!LocalStorageUtils.isAuthenticated() && (
                <Menu.Item key="/my-confess">
                  <Link to="/my-confess">
                    <Icon type="folder" />
                    Confess của tui
                  </Link>
                </Menu.Item>
              )}
              <Menu.Item key="/search">
                <Link to="/search">
                  <Icon type="book" />
                  Thư viện confess
                </Link>
              </Menu.Item>
              {!LocalStorageUtils.isAuthenticated() && (
                <Menu.Item key="/login">
                  <Link to="/admin-cp">
                    <Icon type="github" />
                    Admin CP
                  </Link>
                </Menu.Item>
              )}
              {LocalStorageUtils.isAuthenticated() && (
                <Menu.Item key="/admin-cp">
                  <Link to="/admin-cp">
                    <Icon type="github" />
                    Admin CP (<strong>{LocalStorageUtils.getNickName()}</strong>
                    )
                  </Link>
                </Menu.Item>
              )}
              {LocalStorageUtils.isAuthenticated() && (
                <Menu.Item key="/new">
                  <Link to="/new">
                    <Icon type="plus" />
                    Viết bài mới
                  </Link>
                </Menu.Item>
              )}
              {LocalStorageUtils.isAuthenticated() && (
                <Menu.Item key="/logout">
                  <a href="/logout" onClick={e => onLogout(e)}>
                    <Icon type="delete" />
                    Thoát khỏi tài khoản
                  </a>
                </Menu.Item>
              )}
            </SubMenu>

            <Menu.Item key="/change">
              <Link to="/change">
                <Icon type="fire" />
                Change!
              </Link>
            </Menu.Item>

            <SubMenu
              title={
                <span>
                  <Icon type="coffee" />
                  Dev Đọc
                </span>
              }
            >
              <Menu.Item key="/medium">
                <Link to="/medium">
                  <Icon type="medium" />
                  Medium cho Dev
                </Link>
              </Menu.Item>

              <Menu.Item key="/toidicodedao">
                <Link to="/toidicodedao">
                  <Icon type="laptop" />
                  Tôi đi code dạo
                </Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="/radio">
              <Link to="/radio">
                <Icon type="customer-service" />
                Radio
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
      )}
    </React.Fragment>
  );
}

export default withRouter(HeaderPage);
