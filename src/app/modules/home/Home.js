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
    componentDidMount() {
        const { getHomeArticles } = this.props;

        getHomeArticles();
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

            // If thumbnail is null or cannot crawl
            if (!post.thumbnail) {
                post.thumbnail =
                    "https://daihoc.fpt.edu.vn/media/2018/04/photo-1-1523351120280767384318-373x273.jpg";
            }

            return (
                <Link to={`/fpt/${guid}/${postTitle}`} key={post.guid}>
                    <Col lg={8} md={12}>
                        <Card
                            hoverable
                            cover={(
                                <img
                                    alt={post.title}
                                    src={post.thumbnail.replace(
                                        /^http:\/\//i,
                                        "https://"
                                    )}
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

        return (
            <Content className="content-container">
                <Helmet>
                    <title>Trang chủ - FPTU Tech Insights</title>
                </Helmet>
                <div className="content-wrapper">
                    <Divider
                        style={{ fontWeight: "lighter", fontSize: "1.5rem" }}
                    >
                        Trang chủ trường có gì hot?
                        {loading && (
                            <Icon
                                type="loading"
                                style={{ marginLeft: "1rem" }}
                            />
                        )}
                    </Divider>

                    {error && (
                        <div>
                            <Alert
                                message="Lỗi API Server"
                                description="Có vấn đề gì đó nên API không lấy được bài mới nữa, bạn đọc tạm bài cũ nha, hoặc refresh trang lại thử"
                                type="error"
                                closable
                            />
                            <div style={{ marginBottom: "2rem" }} />
                        </div>
                    )}

                    {posts && <Row gutter={16}>{this.renderPosts(posts)}</Row>}
                    {loading && !posts.length && (
                        <div>
                            <Skeleton active />
                            <Skeleton active />
                            <Skeleton active />
                        </div>
                    )}
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
