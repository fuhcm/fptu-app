import React, { Component } from "react";

import {
    Layout,
    Card,
    Row,
    Col,
    Skeleton,
    Icon,
    BackTop,
    Badge,
    Divider,
} from "antd";

import { Link } from "react-router-dom";
import Helmet from "react-helmet-async";
import paramCase from "param-case";
import { connect } from "react-redux";
import { getMediumArticles } from "./actions/MediumActions";

const { Content } = Layout;
const { Meta } = Card;

class Index extends Component {
    componentDidMount() {
        const { getMediumArticles, mediumReducer } = this.props;
        const { posts } = mediumReducer;

        if (!posts.length) {
            getMediumArticles();
        }
    }

    renderPosts = posts => {
        return posts.map(post => {
            post.description = post.description
                .replace(/<(.|\n)*?>/g, "")
                .trim();
            post.description = post.description.substring(0, 250) + "...";

            const patt = /https:\/\/medium.com\/p\/(.*)/;
            const guid = patt.exec(post.guid)[1];

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
                    to={`/medium/${guid}/${paramCase(post.title)}`}
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
        const { mediumReducer } = this.props;
        const { loading, posts } = mediumReducer;

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
                            {(loading || !posts) && (
                            <Icon
                                type="loading"
                                style={{ marginLeft: "1rem" }}
                            />
                            )}
                            {!loading && posts && (
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
                    {posts && !loading && (
                        <Row gutter={16}>{this.renderPosts(posts)}</Row>
                    )}
                    {(loading || !posts || !posts.length) && (
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
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);
