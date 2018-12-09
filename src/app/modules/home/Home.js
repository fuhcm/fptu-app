import React, { Component } from "react";

import { getPure } from "../../utils/ApiCaller";

import { Layout, Card, Row, Col, Spin, Icon } from "antd";

const { Content } = Layout;
const { Meta } = Card;

class Home extends Component {
    state = {
        posts: [],
    };

    componentDidMount() {
        getPure(
            "https://api.rss2json.com/v1/api.json?rss_url=https://daihoc.fpt.edu.vn/feed/"
        ).then(res => {
            if (res && res.data && res.data.items) {
                console.log(res.data.items);

                this.setState({
                    posts: res.data.items,
                });
            }
        });
    }

    renderPosts = posts => {
        return posts.map((post, index) => {
            post.description = post.description
                .replace(/<(.|\n)*?>/g, "")
                .trim();
            post.description = post.description.substring(0, 250) + "...";

            return (
                <a href={post.link} target="_blank" rel="noopener noreferrer">
                    <Col lg={8} md={12} key={index}>
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
        const { posts } = this.state;
        return (
            <Content className="content-container">
                <div
                    style={{
                        background: "#fff",
                        padding: "2rem",
                    }}
                >
                    <h2
                        style={{
                            fontSize: "2rem",
                            textAlign: "center",
                            fontWeight: "lighter",
                        }}
                    >
                        FPT University News
                    </h2>
                    {posts && <Row gutter={16}>{this.renderPosts(posts)}</Row>}
                    {!posts && (
                        <Spin
                            indicator={
                                <Icon
                                    type="loading"
                                    style={{ fontSize: 24 }}
                                    spin
                                />
                            }
                        />
                    )}
                </div>
            </Content>
        );
    }
}

export default Home;
