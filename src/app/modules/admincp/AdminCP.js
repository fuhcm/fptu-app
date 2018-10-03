import React, { Component } from "react";
import "./AdminCP.css";

import moment from "moment";

import { Layout, List, Button, Skeleton, Tag, message } from "antd";
import { get, put } from "../../utils/ApiCaller";
import {
    ADMINCP__GET_CONFESS,
    ADMINCP__APPROVE_CONFESS,
    ADMINCP__REJECT_CONFESS,
} from "../../utils/ApiEndpoint";
import LocalStorage from "../../utils/LocalStorage";

const { Content } = Layout;

const stepLoad = 10;

class AdminCP extends Component {
    state = {
        numLoad: stepLoad,
        initLoading: true,
        loading: false,
        data: [],
        list: [],
    };

    componentDidMount() {
        const { numLoad } = this.state;

        this.getData(numLoad, data => {
            this.setState({
                initLoading: false,
                data,
                list: data,
            });
        });

        setTimeout(() => this.setState({ initLoading: false }), 5000);
    }

    getData = async (numLoad, callback) => {
        await setTimeout(() => {
            get(ADMINCP__GET_CONFESS + "/" + numLoad).then(res => {
                callback(res.data);
            });
        }, 1000);
    };

    onLoadMore = () => {
        const { numLoad, data } = this.state;
        const timeoutDate = data;

        this.setState({
            loading: true,
            list: data.concat(
                [...new Array(stepLoad)].map(() => ({ loading: true }))
            ),
        });
        this.getData(numLoad + stepLoad, data => {
            this.setState(
                {
                    data,
                    list: data,
                    loading: false,
                    numLoad: numLoad + stepLoad,
                },
                () => {
                    // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                    // In real scene, you can using public method of react-virtualized:
                    // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                    window.dispatchEvent(new Event("resize"));
                }
            );
        });

        setTimeout(
            () =>
                this.setState({
                    data: timeoutDate,
                    list: data,
                    loading: false,
                }),
            5000
        );
    };

    findIndex(id) {
        const { list } = this.state;

        for (var i = 0; i < list.length; i += 1) {
            if (list[i].id === id) {
                return i;
            }
        }

        return -1;
    }

    handleApprove = id => {
        const { list } = this.state;
        const index = this.findIndex(id);

        // Call API
        put(ADMINCP__APPROVE_CONFESS, { id })
            .then(res => {
                // Update UI
                list[index].approver = LocalStorage.getEmail();
                list[index].status = 1;
                list[index].cfsid = res.data.cfsid;

                this.setState({ list });
                message.success(`Confession có ID ${id} đã bị được duyệt`);
            })
            .catch(err => {
                console.log(err);

                message.error(
                    `Đã xảy ra lỗi, chưa thể duyệt Confession có ID ${id}`
                );
            });
    };

    handleReject = id => {
        const { list } = this.state;
        const index = this.findIndex(id);

        put(ADMINCP__REJECT_CONFESS, { id, reason: "" })
            .then(res => {
                // Update UI
                list[index].approver = LocalStorage.getEmail();
                list[index].status = 2;

                this.setState({ list });
                message.success(`Confession có ID ${id} đã bị từ chối`);
            })
            .catch(err => {
                console.log(err);

                message.error(
                    `Đã xảy ra lỗi, chưa thể từ chối Confession có ID ${id}`
                );
            });
    };

    getNameFromEmail(email) {
        return email.substring(0, email.lastIndexOf("@"));
    }

    pendingConfess = content => (
        <div className="confess-content">{content}</div>
    );

    approvedConfess = (content, approver = "admin@fptu.cf", cfsid = "0") => (
        <div>
            <div className="confess-content">{content}</div>
            <div style={{ margin: ".5rem 0" }}>
                <Tag color="green">
                    #cfsapp
                    {cfsid}
                </Tag>
                <Tag color="blue">#{this.getNameFromEmail(approver)}</Tag>
            </div>
        </div>
    );

    rejectedConfess = (content, approver = "admin@fptu.cf") => (
        <div>
            <div className="confess-content">
                <strike>{content}</strike>
            </div>
            <div style={{ margin: ".5rem 0" }}>
                <Tag color="red">#{this.getNameFromEmail(approver)}</Tag>
            </div>
        </div>
    );

    render() {
        const { initLoading, loading, list } = this.state;
        const loadMore =
            !initLoading && !loading ? (
                <div
                    style={{
                        textAlign: "center",
                        marginTop: 12,
                        height: 32,
                        lineHeight: "32px",
                    }}
                >
                    <Button onClick={this.onLoadMore}>tải thêm confess</Button>
                </div>
            ) : null;

        return (
            <Content className="content-container">
                <div
                    style={{
                        background: "#fff",
                        padding: "2rem",
                        minHeight: 540,
                    }}
                >
                    <h2>Quản lí confession</h2>

                    <List
                        size="large"
                        loading={initLoading}
                        itemLayout="vertical"
                        loadMore={loadMore}
                        dataSource={list}
                        locale={{ emptyText: "Không có dữ liệu" }}
                        renderItem={(item, index) => (
                            <List.Item
                                key={index}
                                actions={
                                    (item.status === 0 ||
                                        item.status === null) && [
                                        <Button
                                            type="primary"
                                            disabled={item.loading}
                                            onClick={() => {
                                                this.handleApprove(item.id);
                                            }}
                                        >
                                            duyệt
                                        </Button>,
                                        <Button
                                            type="danger"
                                            disabled={item.loading}
                                            onClick={() => {
                                                this.handleReject(item.id);
                                            }}
                                        >
                                            từ chối
                                        </Button>,
                                    ]
                                }
                            >
                                <Skeleton title loading={item.loading} active>
                                    <List.Item.Meta
                                        description={moment(
                                            item.createdAt
                                        ).format("HH:mm DD/MM/YYYY")}
                                    />
                                    {(item.status === null ||
                                        item.status === 0) &&
                                        this.pendingConfess(item.content)}
                                    {item.status === 1 &&
                                        this.approvedConfess(
                                            item.content,
                                            item.approver,
                                            item.cfsid
                                        )}
                                    {item.status === 2 &&
                                        this.rejectedConfess(
                                            item.content,
                                            item.approver
                                        )}
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                </div>
            </Content>
        );
    }
}

export default AdminCP;
