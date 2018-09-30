import React, { Component } from "react";
import "./AdminCP.css";

import moment from "moment";

import { Layout, List, Button, Skeleton, Tag, Modal, message } from "antd";
import { get } from "../../utils/ApiCaller";
import { ADMINCP__GET_CONFESS } from "../../utils/ApiEndpoint";
import LocalStorageUtils from "../../utils/LocalStorage";

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

    handleApprove = index => {
        const { list } = this.state;

        Modal.success({
            title: "Đã duyệt",
            content: `Confession có ID ${index} đã được duyệt`,
        });

        list[index].content = (
            <div>
                {list[index].content}
                <div style={{ margin: ".5rem 0" }}>
                    <Tag>
                        #fptucfs
                        {index}
                    </Tag>
                    <Tag>#{LocalStorageUtils.getName() || "admin"}</Tag>
                </div>
            </div>
        );
        list[index].rejected = false;
        list[index].approved = true;

        this.setState({ list });
    };

    handleReject = index => {
        const { list } = this.state;

        message.success(`Confession có ID ${index} đã bị từ chối`)

        list[index].content = (
            <div>
                <strike>{list[index].content}</strike>
                <div style={{ margin: ".5rem 0" }}>
                    <Tag>#{LocalStorageUtils.getName() || "admin"}</Tag>
                </div>
            </div>
        );
        list[index].approved = false;
        list[index].rejected = true;

        this.setState({ list });
    };

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
                                    !item.approved &&
                                    !item.rejected && [
                                        <Button
                                            type="primary"
                                            disabled={item.loading}
                                            onClick={() =>
                                                this.handleApprove(index)
                                            }
                                        >
                                            duyệt
                                        </Button>,
                                        <Button
                                            type="danger"
                                            disabled={item.loading}
                                            onClick={() =>
                                                this.handleReject(index)
                                            }
                                        >
                                            từ chối
                                        </Button>,
                                    ]
                                }
                            >
                                <Skeleton title loading={item.loading} active>
                                    <List.Item.Meta
                                        // title={item.sender}
                                        description={moment(
                                            item.createdAt
                                        ).format("HH:mm DD/MM/YYYY")}
                                    />
                                    {item.content}
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
