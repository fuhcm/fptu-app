import React, { Component } from "react";

import { getPure } from "../../utils/ApiCaller";

import { Layout, Card, Row, Col, Skeleton, Icon, BackTop, message } from "antd";

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
                "https://api.rss2json.com/v1/api.json?rss_url=" +
                    url +
                    "&api_key=ykktbaje0v8srrjd7pzshawjnvmbe3fjifx0gfyq&count=10&order_by=pubDate"
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
                this.setState(
                    {
                        posts,
                        loading: false,
                    },
                    () => {
                        console.log(
                            "Done extracting posts from Local Storage."
                        );
                    }
                );
            }, 1000);
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
                console.log("Saved posts to Local Storage.");
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
        if (this.props.match.params.id && !this.state.loading) {
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
                            marginBottom: "2rem",
                            fontSize: "1.2rem",
                        }}
                    >
                        <h2>
                            Developer Reader
                            {loading && (
                                <Icon
                                    type="loading"
                                    style={{ marginLeft: "1rem" }}
                                />
                            )}
                        </h2>
                    </div>
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
