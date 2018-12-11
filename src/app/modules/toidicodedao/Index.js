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
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "../../utils/LocalStorage";

const { Content } = Layout;
const { Meta } = Card;

class Index extends Component {
    state = {
        loading: true,
        posts: [],
    };

    componentDidMount() {
        const newsExpire = parseInt(
            LocalStorageUtils.getItem(
                LOCAL_STORAGE_KEY.TOIDICODEDAO_NEWS_EXPIRE,
                null
            )
        );
        const now = parseInt(moment().unix());

        if (
            LocalStorageUtils.getItem(
                LOCAL_STORAGE_KEY.TOIDICODEDAO_NEWS,
                null
            ) !== null &&
            now - newsExpire <= 0
        ) {
            let posts = JSON.parse(
                LocalStorageUtils.getItem(
                    LOCAL_STORAGE_KEY.TOIDICODEDAO_NEWS,
                    null
                )
            );

            posts = this.filterNotLightningTalk(posts);

            this.setState({
                posts,
                loading: false,
            });
        } else {
            getArticles(
                ["https://toidicodedao.com", "https://codeaholicguy.com"],
                true,
                "toidicodedao"
            ).then(posts => {
                posts = this.filterNotLightningTalk(posts);

                this.setState({
                    posts,
                    loading: false,
                });
            });
        }
    }

    filterNotLightningTalk(posts) {
        return posts.filter(post => !post.title.includes("Lightning Talk"));
    }

    renderPosts = posts => {
        return posts.map((post, index) => {
            post.description = post.description
                .replace(/<(.|\n)*?>/g, "")
                .trim();
            post.description = post.description.substring(0, 250) + "...";

            const patt = /p=(\d+)$/;
            const guid = patt.exec(post.guid)[1];

            return (
                <Link
                    to={`/toidicodedao/bai-viet/${guid}/${paramCase(
                        post.title
                    )}`}
                    key={index}
                >
                    <Col lg={8} md={12}>
                        <Card
                            hoverable
                            cover={
                                <img
                                    alt={post.title}
                                    src={
                                        post.thumbnail ||
                                        "https://cdn-images-1.medium.com/max/1024/1*7aJPlxn8gwhI7JjcBFr-tQ.jpeg"
                                    }
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
                    <title>Tôi đi code dạo</title>
                    <meta name="description" content="Từ coder đến developer" />
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
                            <img src="https://i.imgur.com/uzF6Fok.png" alt="" />
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
                        Từ coder đến developer
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

export default Index;
