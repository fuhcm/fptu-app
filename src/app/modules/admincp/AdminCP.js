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
    message,
} from "antd";
import { get, put } from "../../utils/ApiCaller";
import {
    ADMINCP__GET_CONFESS,
    ADMINCP__APPROVE_CONFESS,
    ADMINCP__REJECT_CONFESS,
    GUEST__GET_OVERVIEW,
} from "../../utils/ApiEndpoint";
import LocalStorage from "../../utils/LocalStorage";
import TextArea from "antd/lib/input/TextArea";
import { config } from "../../../config";

const { Content } = Layout;

const stepLoad = 10;

class AdminCP extends Component {
    state = {
        numLoad: stepLoad,
        initLoading: true,
        loading: false,
        data: [],
        list: [],
        overview: {},
        rejectModal: {
            visible: false,
        },
        approveModal: {
            visible: false,
        },
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

        this.getOverview(data => {
            this.setState({
                overview: data,
            });
        });
    }

    getData = async (numLoad, callback) => {
        await setTimeout(() => {
            get(ADMINCP__GET_CONFESS + "/" + numLoad).then(res => {
                callback(res.data);
            });
        }, 1000);
    };

    getOverview = callback => {
        get(GUEST__GET_OVERVIEW).then(res => {
            callback(res.data);
        });
    };

    onLoadMore = () => {
        const { numLoad, data } = this.state;

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
                message.success(
                    `Confession có đã được duyệt với ID là ${res.data.cfsid}`
                );

                this.showApproveModal(
                    res.data.cfsid,
                    moment(res.data.createdAt).format("HH:mm DD/MM/YYYY"),
                    res.data.content,
                    this.getNameFromEmail(LocalStorage.getEmail())
                );
            })
            .catch(err => {
                console.log(err);

                message.error(`Đã xảy ra lỗi, chưa thể duyệt Confession này`);
            });
    };

    handleReject = (id, reason) => {
        const { list } = this.state;
        const index = this.findIndex(id);

        put(ADMINCP__REJECT_CONFESS, { id, reason })
            .then(res => {
                // Update UI
                list[index].approver = LocalStorage.getEmail();
                list[index].status = 2;

                this.setState({ list });
                message.success(`Confession này đã bị từ chối`);
            })
            .catch(err => {
                console.log(err);

                message.error(`Đã xảy ra lỗi, chưa thể từ chối Confession này`);
            });
    };

    getNameFromEmail(email) {
        if (email !== null) {
            return email.substring(0, email.lastIndexOf("@"));
        }

        return "admin";
    }

    pendingConfess = content => (
        <div className="confess-content">{content}</div>
    );

    approvedConfess = (content, approver = "admin@fptu.cf", cfsid = "0") => (
        <div>
            <div className="confess-content">{content}</div>
            <div style={{ margin: ".5rem 0" }}>
                <Tag color="green">
                    <a
                        href={`https://www.facebook.com/hashtag/${
                            config.meta.fb_tagname
                        }_${cfsid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        #{config.meta.fb_tagname}
                        {cfsid}
                    </a>
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
        const { id, reason } = this.state.rejectModal;

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

    showApproveModal = (cfsid, time, content, admin) => {
        this.setState({
            approveModal: {
                visible: true,
                cfsid,
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

    render() {
        const {
            initLoading,
            loading,
            list,
            overview,
            rejectModal,
            approveModal,
        } = this.state;
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

                    <Alert
                        message="Thống kê tổng quan"
                        description={
                            <div>
                                <Row>
                                    Lời nhắn đã nhận:{" "}
                                    <strong>{overview.total || "0"}</strong> cái
                                </Row>
                                <Row>
                                    Đang chờ duyệt:{" "}
                                    <strong>{overview.pending || "0"}</strong>{" "}
                                    cái
                                </Row>
                                <Row>
                                    Đã bị từ chối:{" "}
                                    <strong>{overview.rejected || "0"}</strong>{" "}
                                    cái (tỉ lệ:{" "}
                                    {Math.round(
                                        (overview.rejected / overview.total) *
                                            100
                                    ) || "0"}
                                    %)
                                </Row>
                            </div>
                        }
                        type="info"
                        showIcon
                    />

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

                <Modal
                    title="Lí do từ chối"
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
                            Từ cmn chối
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
                        {approveModal.cfsid} [{approveModal.time}]<br />"
                        {approveModal.content}"<br />
                        -----------------
                        <br />
                        {approveModal.admin}
                        <br />
                        #FPTUCfs
                    </div>
                </Modal>
            </Content>
        );
    }
}

export default AdminCP;
