import React, { Component } from "react";

import { Layout, Card, Row, Col, Skeleton, Divider } from "antd";

import { Link } from "react-router-dom";

import Helmet from "react-helmet-async";
import paramCase from "param-case";
import { connect } from "react-redux";
import { getHomeArticles } from "./actions/HomeActions";

const { Content } = Layout;
const { Meta } = Card;

class Home extends Component {
    componentDidMount() {
        const { getHomeArticles, homeReducer } = this.props;
        const { posts } = homeReducer;

        if (posts && !posts.length) {
            getHomeArticles();
        }
    }

    renderPosts = (posts = []) => {
        return posts.map(post => {
            post.description = post.description
                .replace(/<(.|\n)*?>/g, "")
                .trim();
            post.description = post.description.substring(0, 250) + "...";

            const patt = /p=(\d+)$/;
            const guid = patt.exec(
                post.guid.substring(0, post.guid.length - 1)
            )[1];

            const postTitle = paramCase(this.removeVnStr(post.title));

            return (
                <Link to={`/fpt/${guid}/${postTitle}`} key={post.guid}>
                    <Col lg={8} md={12}>
                        <Card
                            hoverable
                            cover={(
                                <img
                                    alt={post.title}
                                    src={post.thumbnail}
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
        const { loading, posts } = homeReducer;

        return (
            <Content className="content-container">
                <Helmet>
                    <title>Trang chủ - FPTU Tech Insider</title>
                </Helmet>
                <div className="content-wrapper">
                    <div
                        style={{
                            textAlign   : "center",
                            marginBottom: "2rem",
                        }}
                    >
                        <img
                            src="/assets/images/logo-fu.png"
                            alt="FPT University"
                        />
                    </div>
                    <Divider style={{ fontWeight: "lighter" }}>
                        Trang chủ trường có gì hot?
                    </Divider>
                    {posts && !loading && (
                        <Row gutter={16}>{this.renderPosts(posts)}</Row>
                    )}
                    {(loading || !posts) && (
                        <div>
                            <Skeleton active />
                            <Skeleton active />
                            <Skeleton active />
                        </div>
                    )}

                    <Divider dashed />

                    <div
                        style={{
                            textAlign      : "center",
                            marginTop      : "1rem",
                            backgroundColor: "#194864",
                            color          : "#fff",
                            padding        : "1rem 1rem .2rem 1rem",
                            borderRadius   : "1rem",
                        }}
                    >
                        <img
                            src="/assets/images/golang-react.jpg"
                            alt=""
                            style={{
                                width       : "100%",
                                maxWidth    : "720px",
                                marginBottom: "1rem",
                                borderRadius: ".5rem",
                            }}
                        />
                        <p style={{ fontSize: "1rem" }}>
                            Read more tech posts at
                            {" "}
                            <strong>
                                <Link to="/medium" style={{ color: "#fff" }}>
                                    fptu.tech/medium
                                </Link>
                            </strong>
                        </p>
                    </div>
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
    getHomeArticles: getHomeArticles,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
