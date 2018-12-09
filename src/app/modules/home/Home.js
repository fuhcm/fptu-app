import React, { Component } from "react";

import { getPure } from "../../utils/ApiCaller";

import { Layout, Card, Row, Col, Skeleton } from "antd";

import logoFU from "./images/logo-fu.png";

const { Content } = Layout;
const { Meta } = Card;

class Home extends Component {
    state = {
        loading: true,
        posts: [],
    };

    componentDidMount() {
        getPure(
            "https://api.rss2json.com/v1/api.json?rss_url=https://daihoc.fpt.edu.vn/feed/"
        ).then(res => {
            if (res && res.data && res.data.items) {
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        posts: res.data.items,
                    });
                }, 1000);
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
                        <img src={logoFU} alt="FPT University" />
                    </div>
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
