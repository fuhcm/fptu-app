import React, { Component } from "react";

import "./Search.scss";

import moment from "moment";

import {
    Layout,
    List,
    Button,
    Skeleton,
    Tag,
    Input,
    Divider,
    message,
} from "antd";
import Helmet from "react-helmet-async";
import Highlighter from "react-highlight-words";
import { get } from "../../utils/ApiCaller";
import {
    GUEST__GET_APPROVED,
    GUEST__GET_SEARCH,
} from "../../utils/ApiEndpoint";

const { Content } = Layout;
const Search = Input.Search;

const stepLoad = 10;

class SearchPage extends Component {
    state = {
        numLoad      : stepLoad,
        initLoading  : true,
        loading      : false,
        data         : [],
        list         : [],
        isSearchMode : false,
        searchKeyword: "",
    };

    componentDidMount() {
        const { numLoad } = this.state;

        this.getData(numLoad, data => {
            this.setState({
                initLoading: false,
                data,
                list       : data,
            });
        });
    }

    getData = async (numLoad, callback) => {
        await setTimeout(() => {
            get(GUEST__GET_APPROVED + "?load=" + numLoad)
                .then(res => {
                    callback(res.data);
                })
                .catch(() => {
                    message.error(
                        "Kết nối tới máy chủ bị lỗi, vui lòng báo lại cho admin để xử lí"
                    );

                    this.setState({
                        loading: false,
                    });
                });
        }, 200);
    };

    handleSearch = async keyword => {
        keyword = keyword.trim();
        if (!keyword) {
            return;
        }

        const { searchKeyword } = this.state;
        if (keyword === searchKeyword) {
            return;
        }

        this.setState({
            initLoading: true,
        });

        await setTimeout(() => {
            get(GUEST__GET_SEARCH + "?q=" + keyword)
                .then(res => {
                    this.setState({
                        initLoading  : false,
                        data         : res.data,
                        list         : res.data,
                        isSearchMode : true,
                        searchKeyword: keyword,
                    });
                })
                .catch(() => {
                    message.error(
                        "Kết nối tới máy chủ bị lỗi, vui lòng báo lại cho admin để xử lí"
                    );

                    this.setState({
                        loading: false,
                    });
                });
        }, 500);
    };

    onLoadMore = () => {
        const { numLoad, data } = this.state;

        this.setState({
            loading: true,
            list   : data.concat(
                [...new Array(stepLoad)].map(() => ({ loading: true }))
            ),
        });
        this.getData(numLoad + stepLoad, data => {
            this.setState(
                {
                    data,
                    list   : data,
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

    approvedConfess = (
        content,
        approver = "admin@fptu.cf",
        cfs_id = "0",
        isSearchMode = false,
        searchKeyword = ""
    ) => (
        <div>
            <div className="confess-content">
                {!isSearchMode && content}
                {isSearchMode && (
                    <Highlighter
                        highlightClassName="highlight-text"
                        searchWords={[
                            searchKeyword,
                            this.removeVnStr(searchKeyword),
                        ]}
                        autoEscape
                        textToHighlight={content}
                    />
                )}
            </div>
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

    removeVnStr(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");

        return str;
    }

    render() {
        const {
            initLoading,
            loading,
            list,
            isSearchMode,
            searchKeyword,
        } = this.state;
        const loadMore =
            !initLoading && !loading && !isSearchMode ? (
                <div
                    style={{
                        textAlign : "center",
                        marginTop : 12,
                        height    : 32,
                        lineHeight: "32px",
                    }}
                >
                    <Button onClick={this.onLoadMore} hidden={!list}>
                        Cho xem thêm vài cài nữa đê
                    </Button>
                </div>
            ) : null;

        return (
            <Content className="content-container">
                <Helmet>
                    <title>Thư viện confess</title>
                </Helmet>
                <div className="content-wrapper">
                    <h2>Thư viện confession</h2>

                    <Search
                        placeholder="Nhập từ khoá để tìm confession cũ"
                        enterButton="Tìm"
                        size="large"
                        onSearch={keyword => this.handleSearch(keyword)}
                    />

                    <Divider dashed />

                    {isSearchMode && (
                        <div
                            style={{ fontSize: "1.2rem", marginBottom: "1rem" }}
                        >
                            Có 
                            {' '}
                            {list ? list.length : 0}
                            {' '}
kết quả với từ khoá
                            {" "}
                            <strong>{searchKeyword}</strong>
                        </div>
                    )}

                    <List
                        size="large"
                        loading={initLoading}
                        itemLayout="vertical"
                        loadMore={loadMore}
                        dataSource={list || []}
                        locale={{
                            emptyText:
                                "Không có confession nào được tìm thấy với từ khoá này!!",
                        }}
                        renderItem={(item, index) => (
                            <List.Item key={index}>
                                <Skeleton title loading={item.loading} active>
                                    <List.Item.Meta
                                        description={moment(
                                            item.created_at
                                        ).format("HH:mm DD/MM/YYYY")}
                                    />
                                    {this.approvedConfess(
                                        item.content,
                                        item.approver,
                                        item.cfs_id,
                                        isSearchMode,
                                        searchKeyword
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

export default SearchPage;
