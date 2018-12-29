import React, { Component } from "react";

import "./Post.scss";

import { Layout, Button, Icon, Skeleton, BackTop, Tag, message } from "antd";
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "../../utils/LocalStorage";
import { Redirect, Link } from "react-router-dom";
import Helmet from "react-helmet-async";
import { getArticles } from "../../utils/Crawl";

const { Content } = Layout;

class Post extends Component {
    constructor(props) {
        super(props);

        if (typeof window !== "undefined") {
            if (
                !JSON.parse(
                    LocalStorageUtils.getItem(
                        LOCAL_STORAGE_KEY.TOIDICODEDAO_NEWS,
                        null
                    )
                )
            ) {
                this.post = null;
            } else {
                const guid = this.props.match.params.id;
                const posts = JSON.parse(
                    LocalStorageUtils.getItem(
                        LOCAL_STORAGE_KEY.TOIDICODEDAO_NEWS,
                        null
                    )
                );
                const post = posts.find(obj => {
                    return (
                        obj.guid === "http://toidicodedao.com/?p=" + guid ||
                        obj.guid === "http://codeaholicguy.com/?p=" + guid
                    );
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
                        LOCAL_STORAGE_KEY.TOIDICODEDAO_NEWS,
                        null
                    )
                )
            ) {
                const loadingMsg = message.loading("Đang cào dữ liệu...", 0);

                setTimeout(loadingMsg, 2000);

                getArticles(
                    ["https://toidicodedao.com", "https://codeaholicguy.com"],
                    true,
                    "toidicodedao"
                ).then(posts => {
                    const guid = this.props.match.params.id;
                    const post = posts.find(obj => {
                        return (
                            obj.guid === "http://toidicodedao.com/?p=" + guid ||
                            obj.guid === "http://codeaholicguy.com/?p=" + guid
                        );
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
            return <Redirect to={`/toidicodedao`} />;
        }

        if (typeof window !== "undefined") {
            console.log("Debug: ", post.title);
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
                    <Link to="/toidicodedao">
                        <Button
                            type="primary"
                            size="large"
                            style={{ marginBottom: "1rem" }}
                        >
                            <Icon type="caret-left" /> Quay lại danh sách bài
                        </Button>
                    </Link>
                    <div className="post-body">
                        <h2 className="post-title">{post && post.title}</h2>
                        <div className="post-tags">
                            {post &&
                                post.categories.map((obj, index) => {
                                    return (
                                        <Tag
                                            color="green"
                                            key={index}
                                            style={{ marginBottom: "0.5rem" }}
                                        >
                                            {obj.charAt(0).toLowerCase() +
                                                obj.slice(1)}
                                        </Tag>
                                    );
                                })}
                        </div>

                        <img
                            src={
                                (post && post.thumbnail && post.thumbnail) || ""
                            }
                            alt=""
                            hidden={loading}
                        />

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
