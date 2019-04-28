import React, { Component } from "react";

import moment from "moment";
import axios from "axios";

import {
    Layout,
    List,
    Button,
    Skeleton,
    Tag,
    Row,
    Modal,
    Switch,
    message,
    Col,
    Card,
    Icon,
    Statistic,
    Popconfirm,
    Tooltip,
} from "antd";
import { ChartCard, MiniBar } from "ant-design-pro/lib/Charts";
import TextArea from "antd/lib/input/TextArea";
import Helmet from "react-helmet-async";
import LocalStorageUtils from "browser/LocalStorage";
import styled from "styled-components";

import TimeAgo from "react-timeago";
import viStrings from "react-timeago/lib/language-strings/vi";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

const formatter = buildFormatter(viStrings);

const { Content } = Layout;

const stepLoad = 10;

const ConfessContent = styled.div`
    white-space: pre-line;
`;

class AdminCP extends Component {
    state = {
        numLoad    : stepLoad,
        initLoading: true,
        loading    : false,
        data       : [],
        list       : [],
        overview   : {},
        rejectModal: {
            visible: false,
        },
        approveModal: {
            visible: false,
        },
        isPosting   : false,
        approvalMode: true,
        userStat    : [],
    };

    componentDidMount() {
        const { numLoad } = this.state;

        FPTUSDK.admin.getListConfession(numLoad).then(data => {
            if (data === null) {
                const { history } = this.props;
                history.push("/login");
            }

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

        FPTUSDK.user.getUsers().then(data => {
            const userStat = data.map(e => {
                return {
                    x: e.nickname,
                    y: e.resolved,
                };
            });

            this.setState({
                userStat,
            });
        });
    }

    onLoadMore = () => {
        const { numLoad, data, approvalMode } = this.state;

        this.setState({
            loading: true,
            list   : data.concat(
                [...new Array(stepLoad)].map(() => ({ loading: true }))
            ),
        });

        FPTUSDK.admin.getListConfession(numLoad + stepLoad).then(data => {
            if (data === null) {
                const { history } = this.props;
                history.push("/login");
            }

            this.setState(
                {
                    data,
                    list   : data,
                    loading: false,
                    numLoad: numLoad + stepLoad,
                },
                () => {
                    window.dispatchEvent(new Event("resize"));

                    if (approvalMode) {
                        this.setState({
                            approvalMode: false,
                        });
                    }
                }
            );
        });
    };

    handleApprove = async id => {
        const { list } = this.state;
        const index = this.findIndex(id);

        FPTUSDK.admin
            .approveConfess(id)
            .then(data => {
                // Update UI
                list[index].approver = LocalStorageUtils.getNickName();
                list[index].status = 1;
                list[index].cfs_id = data.cfs_id;

                this.setState({ list });
                message.success(
                    `Confession đã được duyệt với ID là ${data.cfs_id}`
                );

                this.showApproveModal(
                    data.cfs_id,
                    moment(data.created_at).format("HH:mm DD/MM/YYYY"),
                    data.content,
                    LocalStorageUtils.getNickName()
                );

                if (list[index].push_id) {
                    // Push
                    const headers = {
                        "Content-Type": "application/json",
                        Authorization :
                            "key=AAAARBubfwc:APA91bF18JVA5FjdP7CBOB34nVs21W7AMRZJdU3JGkYvogweo2h8BqYJ-hno2HeVsCIKu__kKaqkOYakpRydPBm4JuOnF0xFuzUENZzMLZ13JMVaaM7Zd55wRr8C4i_IErWagz8FiGaY",
                    };

                    const pushData = {
                        notification: {
                            title: "Confess đã được duyệt",
                            body :
                                "Click vào đây để xem confession nào của bạn đã được duyệt nhé",
                            click_action: "http://fptu.tech/my-confess",
                            icon        :
                                "https://fptu.tech/assets/images/fptuhcm-confessions.png",
                        },
                        to: list[index].push_id,
                    };

                    axios.post(
                        "https://fcm.googleapis.com/fcm/send",
                        pushData,
                        { headers }
                    );
                }
            })
            .catch(() => {
                message.error(`Đã xảy ra lỗi, chưa thể duyệt Confession này`);
            });
    };

    handleReject = (id, reason) => {
        const { list } = this.state;
        const index = this.findIndex(id);

        FPTUSDK.admin
            .rejectConfess(id, reason)
            .then(() => {
                // Update UI
                list[index].approver = LocalStorageUtils.getNickName();
                list[index].status = 2;
                list[index].reason = reason;

                this.setState({ list });
                message.success(`Confession này đã bị từ chối`);

                if (list[index].push_id) {
                    // Push
                    const headers = {
                        "Content-Type": "application/json",
                        Authorization :
                            "key=AAAARBubfwc:APA91bF18JVA5FjdP7CBOB34nVs21W7AMRZJdU3JGkYvogweo2h8BqYJ-hno2HeVsCIKu__kKaqkOYakpRydPBm4JuOnF0xFuzUENZzMLZ13JMVaaM7Zd55wRr8C4i_IErWagz8FiGaY",
                    };

                    const pushData = {
                        notification: {
                            title: "Confess đã bị từ chối",
                            body :
                                "Click vào đây để xem confession nào của bạn đã bị từ chối duyệt nhé",
                            click_action: "http://fptu.tech/my-confess",
                            icon        :
                                "https://fptu.tech/assets/images/fptuhcm-confessions.png",
                        },
                        to: list[index].push_id,
                    };

                    axios.post(
                        "https://fcm.googleapis.com/fcm/send",
                        pushData,
                        { headers }
                    );
                }
            })
            .catch(() => {
                message.error(`Đã xảy ra lỗi, chưa thể từ chối Confession này`);
            });
    };

    pendingConfess = content => <ConfessContent>{content}</ConfessContent>;

    approvedConfess = (
        content,
        approver = "admin",
        cfs_id = "0",
        approveTime,
        pushId
    ) => (
        <ConfessContent>
            <ConfessContent>{content}</ConfessContent>
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
                <Tag color="pink" hidden={!pushId}>
                    #PushEnabled
                </Tag>
                <span>
                    Duyệt
                    {" "}
                    <strong>
                        <TimeAgo date={approveTime} formatter={formatter} />
                    </strong>
                </span>
            </div>
        </ConfessContent>
    );

    rejectedConfess = (content, approver = "admin", reason, pushId) => (
        <div>
            <ConfessContent>
                <strike>{content}</strike>
            </ConfessContent>
            <div style={{ margin: ".5rem 0" }}>
                <Tag color="red">
#
                    {approver}
                </Tag>
                <Tag color="pink" hidden={!pushId}>
                    #PushEnabled
                </Tag>
                <span
                    style={{
                        color     : "white",
                        background: "red",
                        padding   : "0.4rem",
                    }}
                >
                    {reason || "Không có lí do luôn"}
                </span>
            </div>
        </div>
    );

    showModal = id => {
        this.setState({
            rejectModal: {
                visible: true,
                id,
            },
        });
    };

    handleOkRejectModal = e => {
        e.preventDefault();
        const { rejectModal } = this.state;
        const { id, reason } = rejectModal;

        this.handleReject(id, (reason && reason.trim()) || null);

        this.setState({
            rejectModal: {
                visible: false,
            },
        });
    };

    handleCancelRejectModal = e => {
        e.preventDefault();

        this.setState({
            rejectModal: {
                visible: false,
            },
        });
    };

    handleChangeTextarea = e => {
        e.preventDefault();
        const { rejectModal } = this.state;

        this.setState({
            rejectModal: {
                ...rejectModal,
                reason: e.target.value,
            },
        });
    };

    showApproveModal = (cfs_id, time, content, admin) => {
        this.setState({
            approveModal: {
                visible: true,
                cfs_id,
                time,
                content,
                admin,
            },
        });
    };

    handleOkApproveModal = e => {
        e.preventDefault();

        this.setState({
            approveModal: {
                visible: false,
            },
        });
    };

    handleCancelApproveModal = e => {
        e.preventDefault();

        this.setState({
            approveModal: {
                visible: false,
            },
        });
    };

    handleApprovalMode() {
        const { approvalMode } = this.state;

        this.setState({
            approvalMode: !approvalMode,
        });
    }

    findIndex(id) {
        const { list } = this.state;

        for (var i = 0; i < list.length; i += 1) {
            if (list[i].id === id) {
                return i;
            }
        }

        return -1;
    }

    render() {
        const {
            initLoading,
            loading,
            list,
            overview,
            rejectModal,
            approveModal,
            // scheduledTime,
            isPosting,
            approvalMode,
            userStat,
        } = this.state;

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
                    <Button onClick={this.onLoadMore} hidden={!list}>
                        Tải thêm confess cũ
                    </Button>
                </div>
            ) : null;

        return (
            <Content className="content-container">
                <Helmet>
                    <title>Admin CP</title>
                </Helmet>
                <div className="content-wrapper">
                    <h2>Quản lí confession cho admin</h2>

                    <div style={{ maxWidth: "700px", marginBottom: "1rem" }}>
                        <ChartCard
                            loading={overview && !overview.total}
                            title="Hoạt động của các admins"
                            action={(
                                <Tooltip title="Số bài mà các admin đã duyệt/từ chối">
                                    <Icon type="exclamation-circle-o" />
                                </Tooltip>
)}
                            total={(overview && overview.total) || "0"}
                            contentHeight={46}
                        >
                            <MiniBar height={46} data={userStat} />
                        </ChartCard>
                    </div>

                    <Row gutter={16} style={{ marginBottom: "10px" }}>
                        <Card hoverable loading={overview && !overview.total}>
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

                    <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                        <Switch
                            checkedChildren="Chỉ chưa duyệt"
                            unCheckedChildren="Chỉ chưa duyệt"
                            onChange={() => this.handleApprovalMode()}
                            checked={approvalMode}
                            defaultChecked
                        />
                    </div>

                    <List
                        size="large"
                        loading={initLoading}
                        itemLayout="vertical"
                        loadMore={loadMore}
                        dataSource={
                            approvalMode && list
                                ? list.filter(item => item.status === 0)
                                : list || []
                        }
                        locale={{
                            emptyText: "Không có confess nào chưa được duyệt",
                        }}
                        renderItem={(item, index) => (
                            <List.Item
                                key={index}
                                actions={
                                    (item.status === 0 ||
                                        item.status === null) && [
                                            <Popconfirm
                                                title="Bạn có chắc là duyệt cái này?"
                                                okText="Có chứ"
                                                cancelText="Không"
                                                onConfirm={() => {
                                                this.handleApprove(
                                                    item.id,
                                                    true
                                                );
                                            }}
                                                icon={(
                                                    <Icon
                                                        type="question-circle-o"
                                                        style={{ color: "red" }}
                                                    />
)}
                                            >
                                                <a
                                                    href="!#"
                                                    className="ant-btn ant-btn-primary"
                                                    disabled={
                                                    item.loading || isPosting
                                                }
                                                >
                                                duyệt
                                                </a>
                                            </Popconfirm>,
                                            <Button
                                                type="danger"
                                                disabled={item.loading}
                                                onClick={() => {
                                                this.showModal(item.id);
                                            }}
                                            >
                                            từ chối
                                            </Button>,
                                    ]
                                }
                            >
                                <Skeleton title loading={item.loading} active>
                                    <List.Item.Meta
                                        // description={moment(
                                        //     item.created_at
                                        // ).format("HH:mm DD/MM/YYYY")}
                                        description={(
                                            <span>
                                                Được gởi
                                                {" "}
                                                <TimeAgo
                                                    date={item.created_at}
                                                    formatter={formatter}
                                                />
                                            </span>
)}
                                    />
                                    {(item.status === null ||
                                        item.status === 0) &&
                                        this.pendingConfess(item.content)}
                                    {item.status === 1 &&
                                        this.approvedConfess(
                                            item.content,
                                            item.approver,
                                            item.cfs_id,
                                            item.updated_at,
                                            item.push_id
                                        )}
                                    {item.status === 2 &&
                                        this.rejectedConfess(
                                            item.content,
                                            item.approver,
                                            item.reason,
                                            item.push_id
                                        )}
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                </div>

                <Modal
                    title="Lí do không duyệt bài này"
                    visible={rejectModal.visible}
                    onOk={this.handleOkRejectModal}
                    onCancel={this.handleCancelRejectModal}
                    footer={[
                        <Button
                            key="back"
                            onClick={this.handleCancelRejectModal}
                        >
                            Hủy bỏ
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            onClick={this.handleOkRejectModal}
                        >
                            Từ chối
                        </Button>,
                    ]}
                >
                    <TextArea
                        value={rejectModal.reason}
                        onChange={e => this.handleChangeTextarea(e)}
                        rows={4}
                        placeholder="Ghi gì lí do vì sao confess này bị từ chối..."
                    />
                </Modal>

                <Modal
                    title="Chỉ cần Copy & Paste trên Page"
                    visible={approveModal.visible}
                    onOk={this.handleOkApproveModal}
                    onCancel={this.handleCancelApproveModal}
                    footer={[
                        <Button
                            key="submit"
                            type="primary"
                            onClick={this.handleOkApproveModal}
                        >
                            Copy xong rùi
                        </Button>,
                    ]}
                >
                    <div>
                        #FPTUC_
                        {approveModal.cfs_id}
                        {' '}
[
                        {approveModal.time}
                        ]
                        <br />
                        {'"'}
                        {approveModal.content}
                        {'"'}
                        <br />
                        -----------------
                        <br />
-
                        {approveModal.admin}
                        -
                        <br />
                        #FPTUCfs
                    </div>
                </Modal>
            </Content>
        );
    }
}

export default AdminCP;
