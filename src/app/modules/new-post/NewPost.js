import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import { Layout, Input, Button, Skeleton, message } from "antd";

import Helmet from "react-helmet-async";

const { Content } = Layout;
const { TextArea } = Input;

function isImageURL(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}

function NewPost(props) {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(null);
    const [categories, setCategories] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [description, setDescription] = useState(null);
    const [content, setContent] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const id = props.match.params.id;
        if (id && id.length === 24) {
            setIsEdit(true);
            setLoading(true);
            FPTUSDK.post
                .get(id)
                .then(data => {
                    setTitle(data.title);
                    setCategories(data.categories);
                    setThumbnail(data.thumbnail);
                    setDescription(data.description);
                    setContent(data.content);
                    setLoading(false);
                })
                .catch(() => props.history.push("/404"));
        }
    }, []);

    function handleSend() {
        setLoading(true);
        if (!isEdit) {
            FPTUSDK.post
                .new({
                    title,
                    categories,
                    thumbnail,
                    description,
                    content,
                })
                .then(data => {
                    message.success("Đã gửi bài viết mới");
                    props.history.push(`/fpt/${data.id}`);
                })
                .catch(() => {
                    message.error("Có lỗi xảy ra");
                })
                .finally(() => setLoading(false));
        } else {
            FPTUSDK.post
                .update(props.match.params.id, { content })
                .then(() => {
                    message.success("Đã cập nhật bài viết");
                    props.history.push(`/fpt/${props.match.params.id}`);
                })
                .catch(() => {
                    message.error("Có lỗi xảy ra");
                })
                .finally(() => setLoading(false));
        }
    }

    return (
        <Content className="content-container">
            <Helmet>
                <title>Soạn thảo bài viết</title>
            </Helmet>
            <div className="content-wrapper">
                <div
                    style={{
                        maxWidth    : 720,
                        margin      : "auto",
                        marginBottom: "2rem",
                    }}
                >
                    <h2>{isEdit ? "Cập nhật bài" : "Viết bài mới"}</h2>
                    <Skeleton loading={loading} active>
                        <Input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Tiêu đề bài viết"
                            style={{ marginBottom: "1rem" }}
                        />
                        <Input
                            value={categories}
                            onChange={e => setCategories(e.target.value)}
                            placeholder="Chuyên mục, phân cách bởi dấu phẩy"
                            style={{ marginBottom: "1rem" }}
                        />
                        {thumbnail && isImageURL(thumbnail) && (
                            <img
                                src={thumbnail}
                                alt="Thumbnail"
                                style={{
                                    marginBottom: "1rem",
                                    maxWidth    : "400px",
                                }}
                            />
                        )}
                        <Input
                            value={thumbnail}
                            onChange={e => setThumbnail(e.target.value)}
                            placeholder="Link ảnh đại diện"
                            style={{ marginBottom: "1rem" }}
                        />
                        <TextArea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Giới thiệu bài viết"
                            autoSize
                            style={{ marginBottom: "1rem" }}
                        />
                        <TextArea
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            placeholder="Nội dung bài viết (dùng Markdown)"
                            rows={12}
                            autoSize={content && content.length > 500}
                            style={{ marginBottom: "1rem" }}
                        />
                        <div style={{ float: "right" }}>
                            <Button
                                disabled={loading}
                                type="primary"
                                onClick={() => handleSend()}
                            >
                                {isEdit ? "Cập nhật bài" : "Gửi bài"}
                            </Button>
                        </div>
                    </Skeleton>
                </div>
            </div>
        </Content>
    );
}

export default withRouter(NewPost);
