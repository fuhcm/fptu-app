import React, { Component } from "react";

import { getPure } from "../../utils/ApiCaller";

import { Layout, Card, Row, Col, Skeleton, Divider } from "antd";

const { Content } = Layout;
const { Meta } = Card;

class Home extends Component {
    state = {
        loading: true,
        posts: [],
    };

    componentDidMount() {
        getPure(
            "https://cf-api.fptu.tech/crawl?url=https://daihoc.fpt.edu.vn"
        ).then(res => {
            if (res && res.data && res.data.items) {
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        posts: res.data.items,
                    });
                }, 100);
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
                        }}
                    >
                        <img
                            src="https://daihoc.fpt.edu.vn/media/2016/12/Logo-FU-01.png"
                            alt="FPT University"
                        />
                    </div>
                    <Divider style={{ fontWeight: "lighter" }}>
                        FPT University News Crawler
                    </Divider>
                    {posts && <Row gutter={16}>{this.renderPosts(posts)}</Row>}
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

export default Home;
