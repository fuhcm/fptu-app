import React, { Component } from "react";

import "./Post.scss";

import { Layout, Button, Icon, Skeleton, BackTop } from "antd";
import LocalStorageUtils from "../../utils/LocalStorage";
import { Redirect, Link } from "react-router-dom";

const { Content } = Layout;

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = { loading: true };

        if (typeof window !== "undefined") {
            if (!JSON.parse(LocalStorageUtils.getItem("news", null))) {
                this.post = null;
            } else {
                this.post = JSON.parse(LocalStorageUtils.getItem("news", null))[
                    this.props.match.params.id
                ];
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

        if (!post) {
            return <Redirect to="/news" />;
        }

        const { loading } = this.state;

        return (
            <Content className="content-container">
                <BackTop />
                <div
                    style={{
                        background: "#fff",
                        padding: "2rem",
                    }}
                >
                    <Link to="/news">
                        <Button type="primary" style={{ marginBottom: "1rem" }}>
                            <Icon type="caret-left" /> Go back to list
                        </Button>
                    </Link>
                    <div className="post-body">
                        <h2
                            className="post-title"
                            dangerouslySetInnerHTML={{ __html: post.title }}
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
