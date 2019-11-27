import React, { Component } from "react";

import { Layout, Card, Row, Col, Skeleton, Divider, Alert, Icon } from "antd";

import { Link } from "react-router-dom";

import Helmet from "react-helmet-async";
import paramCase from "param-case";
import { connect } from "react-redux";
import { getHomeArticles } from "./actions/HomeActions";

const { Content } = Layout;
const { Meta } = Card;

class Home extends Component {
  state = { numLoad: 9, isLoading: false };

  componentDidMount() {
    const { getHomeArticles } = this.props;

    getHomeArticles();

    window.addEventListener("scroll", this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }

  onScroll = () => {
    const { numLoad, isLoading } = this.state;
    const { homeReducer } = this.props;
    const { posts } = homeReducer;

    if (!posts.length) return;

    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom =
      Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom && !isLoading && numLoad <= posts.length) {
      this.setState({
        isLoading: true,
      });

      setTimeout(() => {
        this.setState({
          numLoad  : numLoad + 9,
          isLoading: false,
        });
      }, 500);
    }
  };

  renderPosts = (posts = []) => {
    const { numLoad } = this.state;
    return posts.slice(0, numLoad).map(post => {
      if (!post || !post.guid) return null;

      post.description = post.description.replace(/<(.|\n)*?>/g, "").trim();
      post.description = post.description.substring(0, 250) + "...";

      const patt = /p=(\d+)$/;
      const guid =
        post.type !== "markdown"
          ? patt.exec(post.guid.substring(0, post.guid.length))[1]
          : post.guid;

      const postTitle = paramCase(this.removeVnStr(post.title));

      // If thumbnail is null or cannot crawl
      if (!post.thumbnail) {
        post.thumbnail =
          "https://daihoc.fpt.edu.vn/media/2018/04/photo-1-1523351120280767384318-373x273.jpg";
      }

      return (
        <Link
          to={{
            pathname : `/fpt/${guid}/${postTitle}`,
            postTitle: post.title,
          }}
          key={post.guid}
        >
          <Col lg={8} md={12}>
            <Card
              hoverable
              cover={(
                <img
                  alt={post.title}
                  src={post.thumbnail.replace(/^http:\/\//i, "https://")}
                  style={{
                    objectFit: "cover",
                    height   : "15rem",
                  }}
                />
)}
              style={{ marginBottom: "1rem" }}
            >
              <Meta
                style={{
                  height  : "10rem",
                  overflow: "hidden",
                }}
                title={post.title}
                description={post.description}
              />
            </Card>
          </Col>
        </Link>
      );
    });
  };

  removeVnStr(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");

    return str;
  }

  render() {
    const { homeReducer } = this.props;
    const { loading, posts, error } = homeReducer;
    const { isLoading } = this.state;

    return (
      <Content className="content-container">
        <Helmet>
          <title>Trang chủ - FUHCM.com</title>
        </Helmet>
        <div className="content-wrapper">
          <Divider style={{ fontWeight: "lighter", fontSize: "1.5rem" }}>
            Tin mới
            {loading && <Icon type="loading" style={{ marginLeft: "1rem" }} />}
          </Divider>

          {error && (
            <div>
              <Alert
                message="Đang cập nhật phiên bản"
                description="Tính năng đọc bài tạm thời ngưng hoạt động, chúng tôi đang làm việc chăm chỉ để mang tính năng này trở lại sớm nhất."
                type="error"
                closable
              />
              <div style={{ marginBottom: "2rem" }} />
            </div>
          )}

          {posts && <Row gutter={16}>{this.renderPosts(posts)}</Row>}
          {(loading && !posts.length) ||
            (isLoading && (
              <div>
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
              </div>
            ))}
        </div>
      </Content>
    );
  }
}

const mapStateToProps = ({ homeReducer }) => {
  return {
    homeReducer,
  };
};

const mapDispatchToProps = {
  getHomeArticles,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
