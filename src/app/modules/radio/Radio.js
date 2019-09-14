import React, { Component } from "react";

import "./Radio.scss";

import { Layout, List, Spin, Tag, Switch } from "antd";

import Helmet from "react-helmet-async";
import YouTube from "react-youtube";

const { Content } = Layout;

Array.prototype.randomElement = function() {
    return this[Math.floor(Math.random() * this.length)];
};

const listRadios = [
    {
        id   : "2sIC1sh-yc0",
        title: "MIN - ĐỪNG YÊU NỮA, EM MỆT RỒI | OFFICIAL MUSIC VIDEO",
    },
    {
        id   : "iE52-XXnQqs",
        title: "AMEE x B RAY - ANH NHÀ Ở ĐÂU THẾ | Official Music Video",
    },
    {
        id   : "95ahbau-rJk",
        title: "Ex's Hate Me - B Ray x Masew (Ft AMEE) | Official MV",
    },
    {
        id   : "KREnGJE0vXQ",
        title: "Duyên - Huỳnh Tú ft Khói ft Magazine | Official Music Video",
    },
    {
        id   : "tvlC-60aI9g",
        title: "Quá Lâu - Vinh Khuat",
    },
    {
        id   : "AiD1a2fFFLw",
        title:
            "KHÔNG SAO MÀ EM ĐÂY RỒI | SUNI HẠ LINH ft. Lou Hoàng | Official M/V",
    },
    {
        id   : "U4P3djsPU94",
        title:
            "CHO ANH XIN THÊM 1 PHÚT | TRỊNH THĂNG BÌNH ft LIZ KIM CƯƠNG | OFFICIAL MV",
    },
    {
        id   : "HXkh7EOqcQ4",
        title: "THẰNG ĐIÊN | JUSTATEE x PHƯƠNG LY | OFFICIAL MV",
    },
    {
        id   : "VCYJckDc_fw",
        title: "CÒN YÊU, ĐÂU AI RỜI ĐI - ĐỨC PHÚC | OFFICIAL MV",
    },
    {
        id   : "ZwDxaM5VBJM",
        title: "AMEE - ĐEN ĐÁ KHÔNG ĐƯỜNG | Official Music Video",
    },
];

listRadios.sort((a, b) => {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
});

class Radio extends Component {
    state = {
        currentVideo: listRadios.randomElement(),
        online      : Math.floor(Math.random() * 11),
        hideList    : false,
    };
    componentDidMount() {
        setInterval(
            function() {
                if (Math.random() >= 0.5) return;
                const { online } = this.state;
                const bool = online <= 1 ? true : Math.random() >= 0.5;

                this.setState(prevState => ({
                    online: bool ? prevState.online + 1 : prevState.online - 1,
                }));
            }.bind(this),
            2000
        );
    }
    playNextVideo = () => {
        this.setState({
            currentVideo: listRadios.randomElement(),
        });
    };
    playVideo = id => {
        const index = listRadios.findIndex(e => e.id === id);
        if (index !== -1) {
            this.setState({
                currentVideo: listRadios[index],
            });
        }
    };
    toggleList = () => {
        this.setState(prevState => ({
            hideList: !prevState.hideList,
        }));
    };
    render() {
        const opts = {
            height    : "560",
            width     : "860",
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
            },
        };

        const { currentVideo, online, hideList } = this.state;

        return (
            <Content
                className="content-container"
                style={{ background: "#FAEBCA" }}
            >
                <Helmet>
                    <title>Radio - FPTU HCM Confessions</title>
                </Helmet>
                <div className="content-wrapper radio-wrapper">
                    <div style={{ textAlign: "center" }}>
                        <YouTube
                            videoId={currentVideo.id}
                            opts={opts}
                            onEnd={this.playNextVideo}
                        />

                        <h2 style={{ marginTop: "1rem" }}>
                            Có 
                            {' '}
                            <strong>{online}</strong>
                            {' '}
người đang nghe Radio
                            với bạn
                            {" "}
                        </h2>
                        <Switch
                            defaultChecked
                            checkedChildren="Hiện radio list"
                            unCheckedChildren="Ẩn radio list"
                            onChange={this.toggleList}
                        />
                        <div className="list-radio-wrapper" hidden={hideList}>
                            <List
                                style={{
                                    marginTop   : "1rem",
                                    marginBottom: "1rem",
                                }}
                                // bordered
                                className="list-radio-inside"
                                dataSource={listRadios}
                                renderItem={item => (
                                    <List.Item
                                        className={
                                            item.id === currentVideo.id
                                                ? "selected-row"
                                                : ""
                                        }
                                        style={{
                                            cursor:
                                                item.id === currentVideo.id
                                                    ? "unset"
                                                    : "pointer",
                                        }}
                                        onClick={() => this.playVideo(item.id)}
                                    >
                                        {item.id === currentVideo.id && (
                                            <Spin
                                                size="small"
                                                style={{
                                                    marginRight: "0.5rem",
                                                }}
                                            />
                                        )}
                                        {" "}
                                        {item.title}
                                        {" "}
                                        {item.id === "2sIC1sh-yc0" && (
                                            <Tag color="red">
                                                Top #1 Trending
                                            </Tag>
                                        )}
                                        {item.id === "tvlC-60aI9g" && (
                                            <Tag color="blue">Top #1 Indie</Tag>
                                        )}
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </Content>
        );
    }
}

export default Radio;
