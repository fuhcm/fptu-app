import React, { Component } from "react";

import moment from "moment";

import {
    Layout,
    List,
    Button,
    Skeleton,
    Tag,
    Row,
    Icon,
    Statistic,
    Col,
    Card,
} from "antd";
import Helmet from "react-helmet-async";
import { askForPermissioToReceiveNotifications } from "../../../firebase";

const { Content } = Layout;

const stepLoad = 10;

class MyConfess extends Component {
    state = {
        numLoad    : stepLoad,
        initLoading: true,
        loading    : false,
        data       : [],
        list       : [],
        overview   : {},
    };

    componentDidMount() {
        const { numLoad } = this.state;

        FPTUSDK.myconfess.getMyConfess(numLoad).then(data => {
            this.setState({
                initLoading: false,
                data,
                list       : data,
            });
        });

        FPTUSDK.overview.getOverview().then(data => {
            this.setState({
                overview: data,
            });
        });
    }

    onLoadMore = () => {
        const { numLoad, data } = this.state;

        this.setState({
            loading: true,
            list   : data.concat(
                [...new Array(stepLoad)].map(() => ({ loading: true }))
            ),
        });

        FPTUSDK.myconfess.getMyConfess(numLoad).then(data => {
            this.setState(
                {
                    data,
                    list   : data,
                    loading: false,
                    numLoad: numLoad + stepLoad,
                },
                () => {
                    window.dispatchEvent(new Event("resize"));
                }
            );
        });
    };

    pendingConfess = content => (
        <div>
            <div className="confess-content">{content}</div>
            <div style={{ margin: ".5rem 0" }}>
                <Tag color="pink">#đang_đợi_duyệt</Tag>
            </div>
        </div>
    );

    approvedConfess = (content, approver = "admin@fptu.cf", cfs_id = "0") => (
        <div>
            <div className="confess-content">{content}</div>
            <div style={{ margin: ".5rem 0" }}>
                <Tag color="green">
                    <a
                        href={`https://www.facebook.com/hashtag/${
                            APP_ENV.FB_TAGNAME
                        }_${cfs_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        #
                        {APP_ENV.FB_TAGNAME}
                        {cfs_id}
                    </a>
                </Tag>
                <Tag color="blue">
#
                    {approver}
                </Tag>
            </div>
        </div>
    );

    rejectedConfess = (content, approver = "admin@fptu.cf", reason) => (
        <div>
            <div className="confess-content">
                <strike>{content}</strike>
            </div>
            <div style={{ margin: ".5rem 0" }}>
                <Tag color="red">
#
                    {approver}
                </Tag>
            </div>
            <div style={{ margin: ".5rem 0" }}>
                <strong>
                    Lí do bị
                    {" " + approver}
                    {' '}
từ chối:
                    {" "}
                </strong>
                {" "}
                {reason || "Hem có"}
            </div>
        </div>
    );

    render() {
        const { initLoading, loading, list, overview } = this.state;
        const loadMore =
            !initLoading && !loading ? (
                <div
                    style={{
                        textAlign : "center",
                        marginTop : 12,
                        height    : 32,
                        lineHeight: "32px",
                    }}
                >
                    <Button onClick={this.onLoadMore} hidden={!list.length}>
                        Cho xem thêm vài cài nữa đê
                    </Button>
                </div>
            ) : null;

        return (
            <Content className="content-container">
                <Helmet>
                    <title>Confess của tui</title>
                </Helmet>
                <div className="content-wrapper">
                    <h2>Confess của tui</h2>

                    <Row gutter={16} style={{ marginBottom: "10px" }}>
                        <Card hoverable loading={!overview.total}>
                            <Col lg={8} md={12}>
                                <Statistic
                                    title="Đã nhận"
                                    value={(overview && overview.total) || "0"}
                                    prefix={<Icon type="message" />}
                                    suffix="cái"
                                />
                            </Col>
                            <Col lg={8} md={12}>
                                <Statistic
                                    title="Đang chờ duyệt"
                                    value={
                                        (overview && overview.pending) || "0"
                                    }
                                    prefix={<Icon type="coffee" />}
                                    suffix="cái"
                                />
                            </Col>
                            <Col lg={8} md={12}>
                                <Statistic
                                    title="Tỉ lệ bị từ chối"
                                    value={
                                        Math.round(
                                            (overview &&
                                                overview.rejected /
                                                    overview.total) * 100
                                        ) || 0
                                    }
                                    prefix={<Icon type="fire" />}
                                    suffix="%"
                                />
                            </Col>
                        </Card>
                    </Row>

                    <div>
                        <Button
                            type="primary"
                            size="large"
                            onClick={askForPermissioToReceiveNotifications}
                        >
                            <Icon type="thunderbolt" />
                            Nhận thông báo đẩy khi được duyệt
                        </Button>
                    </div>

                    <List
                        size="large"
                        loading={initLoading}
                        itemLayout="vertical"
                        loadMore={loadMore}
                        dataSource={list || []}
                        locale={{
                            emptyText:
                                "Bạn ơi, bạn chưa gửi cái confess nào hết á!!",
                        }}
                        renderItem={(item, index) => (
                            <List.Item key={index}>
                                <Skeleton title loading={item.loading} active>
                                    <List.Item.Meta
                                        description={moment(
                                            item.created_at
                                        ).format("HH:mm DD/MM/YYYY")}
                                    />
                                    {(item.status === null ||
                                        item.status === 0) &&
                                        this.pendingConfess(item.content)}
                                    {item.status === 1 &&
                                        this.approvedConfess(
                                            item.content,
                                            item.approver,
                                            item.cfs_id
                                        )}
                                    {item.status === 2 &&
                                        this.rejectedConfess(
                                            item.content,
                                            item.approver,
                                            item.reason
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
