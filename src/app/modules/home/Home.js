import React, { PureComponent } from "react";

import { Layout, Card, Row, Col, Skeleton, Divider } from "antd";

import Helmet from "react-helmet-async";
import { getArticles } from "../../utils/Crawl";

const { Content } = Layout;
const { Meta } = Card;

class Home extends PureComponent {
    state = {
        loading: true,
        posts  : [],
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
        return posts.map(post => {
            post.description = post.description
                .replace(/<(.|\n)*?>/g, "")
                .trim();
            post.description = post.description.substring(0, 250) + "...";

            return (
                <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
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
                <div className="content-wrapper">
                    <div
                        style={{
                            textAlign   : "center",
                            marginBottom: "2rem",
                        }}
                    >
                        <img
                            src="/assets/images/logo-fu.png"
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
                            textAlign      : "center",
                            marginTop      : "1rem",
                            backgroundColor: "#194864",
                            color          : "#fff",
                            padding        : "1rem 1rem .2rem 1rem",
                            borderRadius   : "1rem",
                        }}
                    >
                        <img
                            src="/assets/images/golang-react.jpg"
                            alt=""
                            style={{
                                width       : "100%",
                                maxWidth    : "720px",
                                marginBottom: "1rem",
                                borderRadius: ".5rem",
                            }}
                        />
                        <p style={{ fontSize: "1rem" }}>
                            Read more tech posts at
                            {" "}
                            <strong>fptu.tech/news</strong>
                        </p>
                    </div>
                </div>
            </Content>
        );
    }
}

export default Home;
