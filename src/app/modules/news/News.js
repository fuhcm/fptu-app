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

import moment from "moment";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import paramCase from "param-case";
import { getArticles } from "../../utils/Crawl";
import LocalStorageUtils from "../../utils/LocalStorage";
import queryString from "query-string";

const { Content } = Layout;
const { Meta } = Card;

class News extends Component {
    state = {
        loading: true,
        posts: [],
    };

    componentDidMount() {
        const newsExpire = parseInt(
            LocalStorageUtils.getItem("news_expire", null)
        );
        const now = parseInt(moment().unix());

        if (
            LocalStorageUtils.getItem("news", null) !== null &&
            now - newsExpire <= 0
        ) {
            const posts = JSON.parse(LocalStorageUtils.getItem("news", null));

            setTimeout(() => {
                this.setState({
                    posts,
                    loading: false,
                });

                if (typeof window !== undefined) {
                    const { pos } = queryString.parse(window.location.search);

                    if (pos) {
                        window.scrollTo(0, pos);
                    }
                }
            }, 0);
        } else {
            getArticles().then(posts => {
                this.setState({
                    posts,
                    loading: false,
                });
            });
        }
    }

    renderPosts = posts => {
        return posts.map((post, index) => {
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
                <Link to={`/post/${guid}/${paramCase(post.title)}`} key={index}>
                    <Col lg={8} md={12}>
                        <Card
                            hoverable
                            cover={
                                <img
                                    alt={post.title}
                                    src={post.thumbnail}
                                    style={{
                                        objectFit: "cover",
                                        height: "15rem",
                                    }}
                                />
                            }
                            style={{ marginBottom: "1rem" }}
                        >
                            <Meta
                                style={{
                                    height: "10rem",
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
        const { loading, posts } = this.state;

        return (
            <Content className="content-container">
                <Helmet>
                    <title>Medium for Devs</title>
                    <meta name="description" content="Medium for Devs" />
                </Helmet>
                <BackTop />
                <div
                    style={{
                        background: "#fff",
                        padding: "2rem",
                    }}
                >
                    <div
                        style={{
                            textAlign: "center",
                            fontSize: "1.2rem",
                        }}
                    >
                        <h2>
                            <span style={{ color: "darkblue" }}>DEVs</span>{" "}
                            Reader
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
                                            color: "#fff",
                                        }}
                                    />
                                </span>
                            )}
                        </h2>
                    </div>
                    <Divider style={{ fontWeight: "lighter" }}>
                        Daily Dev News
                    </Divider>
                    {posts && !loading && (
                        <Row gutter={16}>{this.renderPosts(posts)}</Row>
                    )}
                    {loading && (
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

export default News;
