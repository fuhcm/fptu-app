import React, { Component } from "react";
import "./Post.scss";

import { Layout, Button, Icon, BackTop, Tag, Skeleton } from "antd";
import { withRouter } from "react-router-dom";
import Helmet from "react-helmet-async";
import styled from "styled-components";
import axios from "axios";
import NotFound from "../not-found/NotFound";
import DisqusComponent from "../../utils/shared/disqus/DisqusComponent";

const { Content } = Layout;

const PostBody = styled.div`
    width: 740px;
    margin: 0 auto;

    img {
        width: unset;
        height: unset;
        max-width: 100%;
    }

    @media screen and (max-width: 1024px) {
        width: 100%;
    }
`;

const PostTitle = styled.h2`
    font-size: 2.5rem;
    font-weight: bold;
    font-family: Georgia;

    @media screen and (max-width: 1024px) {
        font-size: 1.5rem;
    }
`;

const PostTag = styled.div`
    margin-bottom: 1rem;
`;

const PostContent = styled.div`
    font-size: 1.25rem;
    font-family: Georgia;

    @media screen and (max-width: 1024px) {
        font-size: 1rem;
    }

    a {
        color: #000;
    }

    hr {
        display: none;
    }

    p:last-child {
        display: none;
    }

    iframe {
        width: 100%;
        height: 100%;
        border: 1px dashed blue;
        resize: vertical;
        overflow: auto;
    }
`;

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            post   : {
                title: props.location.postTitle,
            },
        };
    }

    componentDidMount() {
        const { match } = this.props;
        const guid = match.params.id;

        // Scroll to top
        if (typeof window !== "undefined") {
            window.scrollTo(0, 0);
        }

        FPTUSDK.crawl
            .getArticleDetails("medium", guid)
            .then(data => {
                this.setState(
                    {
                        loading: false,
                        post   : data,
                    },
                    () => {
                        const arr = this.listGistNotResolved(data);
                        this.resolveGist(arr, data);
                    }
                );
            })
            .catch(() => {
                this.setState({
                    loading: false,
                    post   : null,
                });
            });
    }

    listGistNotResolved = post => {
        if (!post) return [];

        const pattern = /<a[^>]*medium\.com\/media\/[^>]*>(.*?)<\/a>/g;

        return post.content.match(pattern);
    };

    resolveGist = (arr, post) => {
        if (!arr || !arr.length) return;

        arr.forEach(async element => {
            const href = element.match(/href="([^"]*)/)[1];

            const { data } = await axios.get(
                `${APP_ENV.API_BASE_URL}/gist?url=${href}`
            );

            if (!data.includes("gist")) {
                if (data.includes("youtube")) {
                    post.content = post.content.replace(
                        element,
                        `<p>Youtube Video, click <a href="${href}" target="_blank">here</a> to play</p>`
                    );

                    this.setState({
                        post,
                    });
                }

                return;
            }

            post.content = post.content.replace(
                element,
                `<iframe src="data:text/html;charset=utf-8, <script src=${data}.js></script>" width="100%" scrolling="yes" frameborder="0">
                </iframe>`
            );

            this.setState({
                post,
            });
        });
    };

    goBack = () => {
        if (typeof window !== "undefined") {
            if (window.history.length === 1) {
                const { history } = this.props;
                history.push("/medium");
            } else {
                window.history.back();
            }
        }
    };

    render() {
        const { post, loading } = this.state;

        if (!post) {
            return <NotFound />;
        }

        return (
            <Content className="content-container">
                <Helmet>
                    <title>
                        {(post && post.title) ||
                            "Medium for Devs - FPTU Tech Insights"}
                    </title>
                </Helmet>
                <BackTop />
                <div className="content-wrapper">
                    <Button
                        type="primary"
                        size="large"
                        style={{ marginBottom: "1rem" }}
                        onClick={this.goBack}
                    >
                        <Icon type="caret-left" />
                        Quay lại danh sách bài
                    </Button>
                    <PostBody>
                        <PostTitle>{post && post.title}</PostTitle>
                        <div hidden={!loading}>
                            <Skeleton active />
                            <Skeleton active />
                            <Skeleton active />
                        </div>
                        <PostTag>
                            {post &&
                                post.categories &&
                                post.categories.length &&
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
                        </PostTag>
                        <PostContent
                            //eslint-disable-next-line
                            dangerouslySetInnerHTML={{
                                __html: post && post.content,
                            }}
                        />

                        <DisqusComponent
                            guid={post && post.guid}
                            title={post && post.title}
                        />
                    </PostBody>
                </div>
            </Content>
        );
    }
}

export default withRouter(Post);
