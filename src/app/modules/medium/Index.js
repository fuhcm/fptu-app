import React, { Component } from "react";

import {
    Layout,
    Card,
    Row,
    Button,
    Col,
    Skeleton,
    Icon,
    BackTop,
    Badge,
    Divider,
    Alert,
} from "antd";

import { Link } from "react-router-dom";
import Helmet from "react-helmet-async";
import paramCase from "param-case";
import { connect } from "react-redux";
import { getMediumArticles, loadMoreArticle } from "./actions/MediumActions";

const { Content } = Layout;
const { Meta } = Card;

class Index extends Component {
    componentDidMount() {
        const { getMediumArticles } = this.props;

        getMediumArticles();
    }

    renderPosts = (posts, load = 9) => {
        posts = posts.slice(0, load);

        return posts.map(post => {
            post.description = post.description
                .replace(/<(.|\n)*?>/g, "")
                .trim();
            post.description = post.description.substring(0, 250) + "...";

            const patt = /https:\/\/medium.com\/p\/(.*)/;

            let guid = 0;
            try {
                guid = patt.exec(post.guid)[1];
            } catch (e) {
                guid = post.guid;
            }

            // Solve Medium image null
            if (!post.thumbnail.includes("https://cdn")) {
                const imageArr = [
                    "https://cdn-images-1.medium.com/max/1024/1*FqumB-IFSXQk9wW9ElYvqw.jpeg",
                    "https://cdn-images-1.medium.com/max/1024/0*k5_YVMBW9-yD10yN",
                    "https://cdn-images-1.medium.com/max/1024/1*BUA0Pq-I3lEqnFv1sVl47w.jpeg",
                    "https://cdn-images-1.medium.com/max/1024/1*kIC9VHwIsNQAIOpjraB-Iw.jpeg",
                    "https://cdn-images-1.medium.com/max/1024/0*DdOLxRL3KAHZ7Nwq",
                ];

                post.thumbnail =
                    imageArr[Math.floor(Math.random() * imageArr.length)];
            }

            return (
                <Link
                    to={{
                        pathname : `/medium/${guid}/${paramCase(post.title)}`,
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

    render() {
        const { mediumReducer, loadMoreArticle } = this.props;
        const { loading, posts, load, error } = mediumReducer;

        return (
            <Content className="content-container">
                <Helmet>
                    <title>Medium for Devs</title>
                    <meta name="description" content="Medium for Devs" />
                </Helmet>
                <BackTop />
                <div className="content-wrapper">
                    <div
                        style={{
                            textAlign: "center",
                            fontSize : "1.2rem",
                        }}
                    >
                        <h2>
                            <span style={{ color: "darkblue" }}>DEV</span>
                            {' '}
Đọc
                            {loading && (
                            <Icon
                                type="loading"
                                style={{ marginLeft: "1rem" }}
                            />
                            )}
                            {!loading && (
                                <span
                                    style={{
                                        marginLeft: "1rem",
                                    }}
                                >
                                    <Badge
                                        count={posts.length + "+"}
                                        style={{
                                            backgroundColor: "#40A9FF",
                                            color          : "#fff",
                                        }}
                                    />
                                </span>
                            )}
                        </h2>
                    </div>
                    <Divider style={{ fontWeight: "lighter" }}>
                        Bài hay trên 
                        {' '}
                        <strong>Medium</strong>
                        {' '}
hàng ngày
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

                    {posts && (
                        <div>
                            <Row gutter={16}>
                                {this.renderPosts(posts, load)}
                            </Row>
                            <Row style={{ textAlign: "center" }}>
                                <Button
                                    type="primary"
                                    size="large"
                                    onClick={loadMoreArticle}
                                    hidden={load >= posts.length}
                                >
                                    <Icon type="caret-down" />
                                    Xem thêm bài cũ hơn
                                </Button>
                            </Row>
                        </div>
                    )}

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

const mapStateToProps = ({ mediumReducer }) => {
    return {
        mediumReducer,
    };
};

const mapDispatchToProps = {
    getMediumArticles: getMediumArticles,
    loadMoreArticle  : loadMoreArticle,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);
