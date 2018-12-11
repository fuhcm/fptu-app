import React, { Component } from "react";

import "./Post.scss";

import { Layout, Button, Icon, Skeleton, BackTop, Tag, message } from "antd";
import LocalStorageUtils from "../../utils/LocalStorage";
import { Redirect, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getArticles } from "../../utils/Crawl";

const { Content } = Layout;

class Post extends Component {
    constructor(props) {
        super(props);

        let pos = 0;
        if (typeof window !== "undefined") {
            pos = window.pageYOffset;
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

        this.state = { loading: true, pos: pos };
    }

    componentDidMount() {
        if (typeof window !== "undefined") {
            window.scrollTo(0, 0);
        }

        if (typeof window !== "undefined") {
            if (!JSON.parse(LocalStorageUtils.getItem("news", null))) {
                const loadingMsg = message.loading("Đang cào dữ liệu...", 0);

                setTimeout(loadingMsg, 2000);

                getArticles().then(posts => {
                    const guid = this.props.match.params.id;
                    const post = posts.find(obj => {
                        return obj.guid === "https://medium.com/p/" + guid;
                    });
                    this.post = post;

                    this.setState({
                        loading: false,
                    });
                });
            } else {
                setTimeout(() => {
                    this.setState({
                        loading: false,
                    });
                }, 1000);
            }
        }
    }

    render() {
        const { post } = this;
        const { loading, pos } = this.state;

        if (!post && !loading) {
            return <Redirect to={`/news`} />;
        }

        return (
            <Content className="content-container">
                <Helmet>
                    <title>{(post && post.title) || "Loading"}</title>
                </Helmet>
                <BackTop />
                <div
                    style={{
                        background: "#fff",
                        padding: "2rem",
                    }}
                >
                    <Link to={`/news?pos=${pos}`}>
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
                            dangerouslySetInnerHTML={{
                                __html: post && post.title,
                            }}
                        />
                        <div className="post-tags">
                            {post &&
                                post.categories.map((obj, index) => {
                                    return (
                                        <Tag
                                            color="geekblue"
                                            key={index}
                                            style={{ marginBottom: "0.5rem" }}
                                        >
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
                                    __html: post && post.content,
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
