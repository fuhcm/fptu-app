import React, { Component } from "react";

import "./Post.scss";

import { Layout, Button, Icon, Skeleton, BackTop, Tag, message } from "antd";
import { Redirect, Link } from "react-router-dom";
import Helmet from "react-helmet-async";
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "../../utils/LocalStorage";
import { getArticles } from "../../utils/Crawl";

const { Content } = Layout;

class Post extends Component {
    constructor(props) {
        super(props);

        if (typeof window !== "undefined") {
            if (
                !JSON.parse(
                    LocalStorageUtils.getItem(
                        LOCAL_STORAGE_KEY.MEDIUM_NEWS,
                        null
                    )
                )
            ) {
                this.post = null;
            } else {
                const { match } = this.props;
                const guid = match.params.id;
                const posts = JSON.parse(
                    LocalStorageUtils.getItem(
                        LOCAL_STORAGE_KEY.MEDIUM_NEWS,
                        null
                    )
                );
                const post = posts.find(obj => {
                    return obj.guid === "https://medium.com/p/" + guid;
                });

                this.post = post;
            }
        } else {
            this.post = null;
        }

        this.state = { loading: true };
    }

    componentDidMount() {
        if (typeof window !== "undefined") {
            window.scrollTo(0, 0);
        }

        if (typeof window !== "undefined") {
            if (
                !JSON.parse(
                    LocalStorageUtils.getItem(
                        LOCAL_STORAGE_KEY.MEDIUM_NEWS,
                        null
                    )
                )
            ) {
                const loadingMsg = message.loading("Đang cào dữ liệu...", 0);

                setTimeout(loadingMsg, 2000);

                getArticles().then(posts => {
                    const { match } = this.props;
                    const guid = match.params.id;
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
        const { loading } = this.state;

        if (!post && !loading) {
            return <Redirect to="/news" />;
        }

        return (
            <Content className="content-container">
                <Helmet>
                    <title>
                        {(post && post.title) ||
                            "Medium for Devs - FPTU Tech Insider"}
                    </title>
                </Helmet>
                <BackTop />
                <div className="content-wrapper">
                    <Link to="/news">
                        <Button
                            type="primary"
                            size="large"
                            style={{ marginBottom: "1rem" }}
                        >
                            <Icon type="caret-left" />
                            Quay lại danh sách bài
                        </Button>
                    </Link>
                    <div className="post-body">
                        <h2 className="post-title">{post && post.title}</h2>
                        <div className="post-tags">
                            {post &&
                                post.categories.map(item => {
                                    return (
                                        <Tag
                                            color="geekblue"
                                            key={item}
                                            style={{ marginBottom: "0.5rem" }}
                                        >
                                            #
                                            {item}
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
                                //eslint-disable-next-line
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
