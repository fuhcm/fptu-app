import React, { Component } from "react";
import "./AdminCP.scss";

import moment from "moment";

import {
    Layout,
    List,
    Button,
    Skeleton,
    Tag,
    Alert,
    Row,
    Modal,
    Switch,
    message,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import Helmet from "react-helmet-async";
import LocalStorageUtils from "browser/LocalStorage";
import AdminService from "service/Admin";
import OverviewService from "service/Overview";

const { Content } = Layout;

const stepLoad = 10;

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
    };

    componentDidMount() {
        const { numLoad } = this.state;

        AdminService.getListConfession(numLoad).then(data => {
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

        OverviewService.getOverview().then(data => {
            this.setState({
                overview: data,
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

        AdminService(numLoad + stepLoad).then(data => {
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
                        message.success("Vừa load thêm 10 cái confess nữa nhé");
                    }
                }
            );
        });
    };

    handleApprove = async id => {
        const { list } = this.state;
        const index = this.findIndex(id);

        AdminService.approveConfess(id)
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
            })
            .catch(() => {
                message.error(`Đã xảy ra lỗi, chưa thể duyệt Confession này`);
            });
    };

    handleReject = (id, reason) => {
        const { list } = this.state;
        const index = this.findIndex(id);

        AdminService.rejectConfess(id, reason)
            .then(() => {
                // Update UI
                list[index].approver = LocalStorageUtils.getNickName();
                list[index].status = 2;
                list[index].reason = reason;

                this.setState({ list });
                message.success(`Confession này đã bị từ chối`);
            })
            .catch(() => {
                message.error(`Đã xảy ra lỗi, chưa thể từ chối Confession này`);
            });
    };

    pendingConfess = content => (
        <div className="confess-content">{content}</div>
    );

    approvedConfess = (
        content,
        approver = "admin",
        cfs_id = "0",
        approveTime
    ) => (
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
                <span>
                    Duyệt lúc
                    {" "}
                    <strong>
                        {moment(approveTime).format("HH:mm DD/MM/YYYY")}
                    </strong>
                </span>
            </div>
        </div>
    );

    rejectedConfess = (content, approver = "admin", reason) => (
        <div>
            <div className="confess-content">
                <strike>{content}</strike>
            </div>
            <div style={{ margin: ".5rem 0" }}>
                <Tag color="red">
#
                    {approver}
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

                    <Alert
                        message="Thống kê tổng quan"
                        description={(
                            <div>
                                <Row>
                                    Lời nhắn đã nhận:
                                    {" "}
                                    <strong>{overview.total || "0"}</strong>
                                    {' '}
cái
                                </Row>
                                <Row>
                                    Đang chờ duyệt:
                                    {" "}
                                    <strong>{overview.pending || "0"}</strong>
                                    {" "}
                                    cái
                                </Row>
                                <Row>
                                    Đã bị từ chối:
                                    {" "}
                                    <strong>{overview.rejected || "0"}</strong>
                                    {" "}
                                    cái (tỉ lệ:
                                    {" "}
                                    {Math.round(
                                        (overview.rejected / overview.total) *
                                            100
                                    ) || "0"}
                                    %)
                                </Row>
                            </div>
)}
                        type="info"
                        showIcon
                    />

                    <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                        <Switch
                            checkedChildren="Chỉ chưa duyệt"
                            unCheckedChildren="Chỉ chưa duyệt"
                            onChange={() => this.handleApprovalMode()}
                            defaultChecked
                        />
                    </div>

                    <List
                        size="large"
                        loading={initLoading}
                        itemLayout="vertical"
                        loadMore={loadMore}
                        dataSource={
                            approvalMode
                                ? list.filter(item => item.status === 0)
                                : list || []
                        }
                        locale={{ emptyText: "Không có confess nào chưa được duyệt" }}
                        renderItem={(item, index) => (
                            <List.Item
                                key={index}
                                actions={
                                    (item.status === 0 ||
                                        item.status === null) && [
                                            <Button
                                                type="primary"
                                                disabled={item.loading || isPosting}
                                                onClick={() => {
                                                this.handleApprove(
                                                    item.id,
                                                    true
                                                );
                                            }}
                                            >
                                            duyệt
                                            </Button>,
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
                                            item.cfs_id,
                                            item.updated_at
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
