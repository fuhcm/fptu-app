import React, { Component } from "react";

import { Layout, Button, Icon, Skeleton, message } from "antd";

import { SE } from "./Data";

import { withRouter, Link } from "react-router-dom";

const { Content } = Layout;

const data = SE;

class ReviewDetails extends Component {
    componentWillMount() {
        const { code } = this.props.match.params;
        const { history } = this.props;

        const match = data.find(e => {
            return e.subjectCode === code.toUpperCase();
        });

        if (!match) {
            history.push("/pentakill");
        }
    }

    componentDidMount() {
        message.warning("Trang này hiện chưa xây xong, quay lại sau nhá!");
    }

    render() {
        const { code } = this.props.match.params;

        return (
            <Content className="content-container">
                <div className="content-wrapper">
                    <Link to="/pentakill">
                        <Button
                            type="default"
                            size="large"
                            style={{ marginBottom: "1rem" }}
                        >
                            <Icon type="caret-left" /> Quay lại danh sách môn
                        </Button>
                    </Link>
                    <div
                        style={{
                            textAlign: "center",
                            fontSize: "2rem",
                            backgroundColor: "#001528",
                            color: "white",
                            padding: "1rem",
                            borderRadius: "10px",
                        }}
                    >
                        {code.toUpperCase()}
                    </div>
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                </div>
            </Content>
        );
    }
}

export default withRouter(ReviewDetails);
