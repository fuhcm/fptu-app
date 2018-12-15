import React, { Component } from "react";

import { getArticles } from "../../utils/Crawl";

import { Layout, Card, Row, Col, Skeleton, Divider } from "antd";

import { Helmet } from "react-helmet";

const { Content } = Layout;
const { Meta } = Card;

class Home extends Component {
    state = {
        loading: true,
        posts: [],
    };

    componentDidMount() {
        getArticles(["https://daihoc.fpt.edu.vn"], false).then(posts => {
            this.setState({
                loading: false,
                posts,
            });
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
                <Helmet>
                    <title>Trang chủ - FPTU Tech Insider</title>
                </Helmet>
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
                        Trang chủ trường có gì hot?
                    </Divider>
                    {posts && <Row gutter={16}>{this.renderPosts(posts)}</Row>}
                    {loading && (
                        <div>
                            <Skeleton active />
                            <Skeleton active />
                            <Skeleton active />
                        </div>
                    )}

                    <Divider dashed />

                    <div
                        style={{
                            textAlign: "center",
                            marginTop: "1rem",
                            backgroundColor: "#194864",
                            color: "#fff",
                            padding: "1rem 1rem .2rem 1rem",
                            borderRadius: "1rem",
                        }}
                    >
                        <img
                            src="https://media.licdn.com/dms/image/C5116AQHJEYOPh4eo5w/profile-displaybackgroundimage-shrink_350_1400/0?e=1550102400&v=beta&t=e1zHWfW8ZA-p3GlZA3-07FBi5ugFiVstLNeqLTA28r4"
                            alt=""
                            style={{
                                width: "100%",
                                maxWidth: "720px",
                                marginBottom: "1rem",
                                borderRadius: ".5rem",
                            }}
                        />
                        <p style={{ fontSize: "1rem" }}>
                            Read more tech posts at{" "}
                            <strong>fptu.tech/news</strong>
                        </p>
                    </div>
                </div>
            </Content>
        );
    }
}

export default Home;
