import React, { Component } from "react";
import "./MyConfess.css";

import moment from "moment";

import {
    Layout,
    List,
    Button,
    Skeleton,
    Tag,
    Row,
    Alert,
    Icon,
    message,
} from "antd";
import { post } from "../../utils/ApiCaller";
import { GUEST__GET_MY_CONFESS } from "../../utils/ApiEndpoint";
import LocalStorageUtils from "../../utils/LocalStorage";

const { Content } = Layout;

const stepLoad = 10;

class MyConfess extends Component {
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
            post(GUEST__GET_MY_CONFESS + "/" + numLoad, {
                token: LocalStorageUtils.getSenderToken(),
            }).then(res => {
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

    handleLoginFacebook = () => {
        message.warning(
            "Tính này hiện chưa sẵn sàng, bạn vui lòng thử lại sau nha"
        );
    };

    getNameFromEmail(email) {
        return email.substring(0, email.lastIndexOf("@"));
    }

    pendingConfess = content => (
        <div>
            <div className="confess-content">{content}</div>
            <div style={{ margin: ".5rem 0" }}>
                <Tag color="pink">#đang_đợi_duyệt</Tag>
            </div>
        </div>
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
            <div className="confess-content"><strike>{content}</strike></div>
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
                    <Button onClick={this.onLoadMore}>
                        cho xem thêm vài cài nữa đê
                    </Button>
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
                    <h2>Danh sách confession tui đã gửi</h2>
                    <Row style={{ marginBottom: "10px" }}>
                        Sender Token của tui là:{" "}
                        <strong>{LocalStorageUtils.getSenderToken()}</strong>
                    </Row>

                    <Row style={{ marginBottom: "10px" }}>
                        <Alert
                            message="Sender Token chỉ lưu trên trình duyệt"
                            description="Nếu bạn muốn lưu lâu dài và truy vấn trên nhiều trình duyệt, hãy chọn đăng nhập bằng Facebook hoặc Google để lưu confession an toàn hơn nhé."
                            type="warning"
                            showIcon
                        />
                    </Row>

                    <Row style={{ marginBottom: "20px", marginLeft: "10px" }}>
                        <Button
                            type="primary"
                            onClick={this.handleLoginFacebook}
                        >
                            <Icon type="facebook" />
                            Đăng nhập bằng Facebook
                        </Button>
                    </Row>

                    <List
                        size="large"
                        loading={initLoading}
                        itemLayout="vertical"
                        loadMore={loadMore}
                        dataSource={list}
                        locale={{ emptyText: "Không có dữ liệu" }}
                        renderItem={(item, index) => (
                            <List.Item key={index}>
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

export default MyConfess;
