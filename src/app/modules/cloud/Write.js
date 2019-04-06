import React, { Component } from "react";

import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

import { Layout, Button, Input, Icon, message } from "antd";

import Helmet from "react-helmet-async";
import LocalStorageUtils from "browser/LocalStorage";

const { Content } = Layout;

class Write extends Component {
    constructor(props) {
        super(props);

        const noted = LocalStorageUtils.getItem("note", "");

        this.state = {
            value:
                noted ||
                `# Đây là tiêu đề mẫu, viết bằng Markdown

Còn đây là nội dung mẫu, **bắt đầu viết ngay thôi**!`,
            tab: "write",
        };
        this.converter = new Showdown.Converter({
            tables            : true,
            simplifiedAutoLink: true,
            strikethrough     : true,
            tasklists         : true,
        });
    }

    handleValueChange = value => {
        this.setState({ value });
    };

    handleTabChange = tab => {
        this.setState({ tab });
    };

    handleSave = () => {
        const { value } = this.state;

        LocalStorageUtils.setItem("note", value);

        message.success("Đã lưu cho bạn!");
    };

    render() {
        const { value, tab } = this.state;

        return (
            <Content className="content-container">
                <Helmet>
                    <title>Cloud Write - FPTU Tech Insights</title>
                </Helmet>
                <div className="content-wrapper">
                    <h2>Chia sẻ cái gì đó hay ho và có ích đê...</h2>
                    <Input
                        size="large"
                        placeholder="Đây là tài liệu môn..."
                        style={{ marginBottom: "1rem" }}
                    />

                    <ReactMde
                        onChange={this.handleValueChange}
                        onTabChange={this.handleTabChange}
                        value={value}
                        generateMarkdownPreview={markdown =>
                            Promise.resolve(this.converter.makeHtml(markdown))
                        }
                        selectedTab={tab}
                        l18n={{
                            write  : "Soạn bài",
                            preview: "Xem trước",
                        }}
                    />

                    <Button
                        type="primary"
                        size="large"
                        onClick={this.handleSave}
                        style={{ marginTop: "1rem" }}
                        disabled
                    >
                        <Icon type="check" />
                        Đăng bài
                    </Button>
                    <Button
                        type="dashed"
                        size="large"
                        onClick={this.handleSave}
                        style={{ marginLeft: "1rem" }}
                    >
                        <Icon type="save" />
                        Lưu nháp
                    </Button>
                </div>
            </Content>
        );
    }
}

export default Write;
