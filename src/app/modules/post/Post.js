import React, { Component } from "react";

import "./Post.scss";

import { Layout, Button, Icon, Skeleton, BackTop, Tag } from "antd";
import LocalStorageUtils from "../../utils/LocalStorage";
import { Redirect, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const { Content } = Layout;

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = { loading: true };

        if (typeof window !== "undefined") {
            if (!JSON.parse(LocalStorageUtils.getItem("news", null))) {
                this.post = null;
            } else {
                const guid = this.props.match.params.id;
                const posts = JSON.parse(
                    LocalStorageUtils.getItem("news", null)
                );
                const post = posts.find(obj => {
                    return obj.guid === "https://medium.com/p/" + guid;
                });

                this.post = post;
            }
        } else {
            this.post = null;
        }
    }

    componentDidMount() {
        if (typeof window !== "undefined") {
            window.scrollTo(0, 0);
        }

        setTimeout(() => {
            this.setState({
                loading: false,
            });
        }, 1000);
    }

    render() {
        const { post } = this;

        if (typeof window !== "undefined") {
            if (!JSON.parse(LocalStorageUtils.getItem("news", null))) {
                return (
                    <Redirect
                        to={`/news/fallback/${this.props.match.params.id}`}
                    />
                );
            } else if (!post) {
                return <Redirect to={`/404`} />;
            }
        }

        if (!post) {
            return <Redirect to={`/404`} />;
        }

        const { loading } = this.state;

        return (
            <Content className="content-container">
                <Helmet>
                    <title>{post.title}</title>
                    <meta name="description" content={post.description} />
                </Helmet>
                <BackTop />
                <div
                    style={{
                        background: "#fff",
                        padding: "2rem",
                    }}
                >
                    <Link to="/news">
                        <Button
                            type="primary"
                            size="large"
                            style={{ marginBottom: "1rem" }}
                        >
                            <Icon type="caret-left" /> Go back to list
                        </Button>
                    </Link>
                    <div className="post-body">
                        <h2
                            className="post-title"
                            dangerouslySetInnerHTML={{ __html: post.title }}
                        />
                        <div className="post-tags">
                            {post.categories.map((obj, index) => {
                                return (
                                    <Tag color="geekblue" key={index}>
                                        #{obj}
                                    </Tag>
                                );
                            })}
                        </div>
                        {loading && (
                            <div>
                                <Skeleton active />
                                <Skeleton active />
                                <Skeleton active />
                            </div>
                        )}
                        {!loading && (
                            <div
                                className="post-content"
                                dangerouslySetInnerHTML={{
                                    __html: post.content,
                                }}
                            />
                        )}
                    </div>
                </div>
            </Content>
        );
    }
}

export default Post;
