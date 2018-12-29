import React, { Component } from "react";

import "./Review.scss";

import { Layout, Divider, Carousel, List, Card, AutoComplete } from "antd";

import { Link, withRouter } from "react-router-dom";
import Helmet from "react-helmet-async";

import { SE } from "./Data";

const { Content } = Layout;

const data = SE;

class Review extends Component {
    renderCarousel = array => {
        const shuffled = array.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 5);

        return selected.map(item => {
            return (
                <Link
                    to={`/pentakill/${item.subjectCode.toLowerCase()}`}
                    key={item.subjectCode}
                >
                    <div>
                        <h3>How to pass {item.subjectCode}?</h3>
                    </div>
                </Link>
            );
        });
    };

    render() {
        const autoComplete = data.map(item => {
            return item.subjectCode;
        });

        return (
            <Content className="content-container">
                <Helmet>
                    <title>Tâm sự chuyện học</title>
                </Helmet>
                <div className="content-wrapper">
                    <Carousel autoplay>{this.renderCarousel(data)}</Carousel>
                    <Divider dashed />
                    <AutoComplete
                        backfill
                        size="large"
                        style={{ width: "100%" }}
                        dataSource={autoComplete}
                        placeholder="Tìm mã môn cần được cứu tại đây..."
                        filterOption={(inputValue, option) =>
                            option.props.children
                                .toUpperCase()
                                .indexOf(inputValue.toUpperCase()) !== -1
                        }
                        onSelect={value => {
                            const { history } = this.props;
                            history.push(`/pentakill/${value.toLowerCase()}`);
                        }}
                    />
                    <Divider />
                    <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 2,
                            lg: 2,
                            xl: 3,
                            xxl: 4,
                        }}
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <Link
                                    to={`/pentakill/${item.subjectCode.toLowerCase()}`}
                                >
                                    <Card>
                                        <strong>{item.subjectCode}</strong> -{" "}
                                        {item.subjectName}
                                    </Card>
                                </Link>
                            </List.Item>
                        )}
                    />
                </div>
            </Content>
        );
    }
}

export default withRouter(Review);
