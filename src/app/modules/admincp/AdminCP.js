import React, { Component } from "react";
import "./AdminCP.css";

import { Layout, List, Button, Skeleton } from "antd";
import axios from "axios";
import { apiPath } from "../../../config/api";

const { Content } = Layout;

const apiUrl = apiPath + "/confessions/admincp/";
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

    getData = (numLoad, callback) => {
        axios.get(apiUrl + numLoad).then(res => {
            callback(res.data);
        });
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
            <Content style={{ padding: "0 50px" }}>
                <div
                    style={{
                        background: "#fff",
                        padding: "2rem",
                        minHeight: 540,
                    }}
                >
                    <h2>Quản lí confession</h2>

                    <List
                        loading={initLoading}
                        itemLayout="horizontal"
                        loadMore={loadMore}
                        dataSource={list}
                        locale={{ emptyText: "Không có dữ liệu" }}
                        renderItem={item => (
                            <List.Item>
                                <Skeleton
                                    title={true}
                                    loading={item.loading}
                                    active
                                >
                                    <List.Item.Meta
                                        title={item.sender}
                                        description={item.content}
                                    />
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
