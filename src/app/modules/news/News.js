import React, { Component } from "react";

import { getPure } from "../../utils/ApiCaller";

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
    message,
} from "antd";

import moment from "moment";
import { Link, withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import paramCase from "param-case";
import LocalStorageUtils from "../../utils/LocalStorage";

const { Content } = Layout;
const { Meta } = Card;

class News extends Component {
    state = {
        loading: true,
        posts: [],
    };

    getArticles = async sources => {
        let { posts } = this.state;

        await sources.map(async url => {
            let rss = await this.parseUrl(url);
            posts = posts.concat(rss);

            this.setState({
                posts,
            });

            this.syncNews(posts);

            setTimeout(() => {
                this.setState({
                    loading: false,
                });
            }, 100);
        });
    };

    async parseUrl(url) {
        try {
            const res = await getPure(
                "https://cf-api.fptu.tech/crawl?url=" + url
            );

            if (res && res.data && res.data.items) {
                return res.data.items;
            } else {
                return [];
            }
        } catch (err) {
            console.log(err);

            return [];
        }
    }

    syncNews(posts) {
        const expireTime = moment()
            .add(30, "minutes")
            .unix();
        LocalStorageUtils.setItem("news_expire", JSON.stringify(expireTime));
        LocalStorageUtils.setItem("news", JSON.stringify(posts));
    }

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
            }, 100);
        } else {
            let sources = [
                "https://codeburst.io/feed",
                "https://medium.freecodecamp.org/feed",
                "https://hackernoon.com/feed",
                "https://medium.com/feed/javascript-scene",
                "https://medium.com/feed/dev-channel",
                "https://medium.com/feed/google-developers",
            ];

            this.getArticles(sources);

            setTimeout(() => {
                const { posts } = this.state;

                this.syncNews(posts);
            }, 5000);
        }

        if (this.props.match.params.id) {
            const loadingMsg = message.loading("Đang cào dữ liệu...", 0);

            setTimeout(loadingMsg, 2000);
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
        // Check Fallback case
        if (
            this.props.match.params.id &&
            !this.state.loading &&
            this.state.posts.length >= 59
        ) {
            this.props.history.push(`/post/${this.props.match.params.id}`);
        }

        const { loading, posts } = this.state;

        // Sort posts by pubDate
        posts.sort((left, right) => {
            return moment.utc(right.pubDate).diff(moment.utc(left.pubDate));
        });

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

export default withRouter(News);
