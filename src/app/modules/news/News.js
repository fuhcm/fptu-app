import React, { Component } from "react";

import { getPure } from "../../utils/ApiCaller";

import { Layout, Card, Row, Col, Skeleton, Icon } from "antd";

import moment from "moment";

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

            setTimeout(() => {
                this.setState({
                    loading: false,
                });
            }, 2000);
        });
    };

    async parseUrl(url) {
        try {
            const res = await getPure(
                "https://api.rss2json.com/v1/api.json?rss_url=" + url
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

    componentDidMount() {
        let sources = [
            "https://codeburst.io/feed",
            "https://medium.freecodecamp.org/feed",
            "https://hackernoon.com/feed",
            "https://medium.com/feed/javascript-scene",
            "https://medium.com/feed/dev-channel",
            "https://medium.com/feed/google-developers",
        ];

        this.getArticles(sources);
    }

    renderPosts = posts => {
        return posts.map((post, index) => {
            post.description = post.description
                .replace(/<(.|\n)*?>/g, "")
                .trim();
            post.description = post.description.substring(0, 250) + "...";

            return (
                <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                >
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
                </a>
            );
        });
    };

    render() {
        const { loading, posts } = this.state;

        // Sort posts by pubDate
        posts.sort((left, right) => {
            return moment.utc(right.pubDate).diff(moment.utc(left.pubDate));
        });

        console.log(JSON.stringify(posts));

        return (
            <Content className="content-container">
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
                            fontSize: "2rem",
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

export default News;
