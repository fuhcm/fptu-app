import React, { Component } from "react";

import { Layout, List, Button, Icon } from "antd";

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
        id   : "f-ozNHov4DM",
        title: "Crush on you 🌸 Xin. | Lyric Video",
    },
    {
        id   : "VmbK1EKvm9Y",
        title: "OFFICIAL MV | Lena & CrazyFrogs // Ôi tình yêu thật điêu.",
    },
    {
        id   : "aGUQsb31TEw",
        title: "BIGDADDY x EMILY - Mượn Rượu Tỏ Tình (Official M/V)",
    },
    {
        id   : "HXkh7EOqcQ4",
        title: "THẰNG ĐIÊN | JUSTATEE x PHƯƠNG LY | OFFICIAL MV",
    },
    {
        id   : "VCYJckDc_fw",
        title: "CÒN YÊU, ĐÂU AI RỜI ĐI - ĐỨC PHÚC | OFFICIAL MV",
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
    };
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
    render() {
        const opts = {
            height    : "585",
            width     : "960",
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
            },
        };

        const { currentVideo } = this.state;

        return (
            <Content className="content-container">
                <Helmet>
                    <title>Radio - FPTU HCM Confessions</title>
                </Helmet>
                <div className="content-wrapper">
                    <div style={{ textAlign: "center" }}>
                        <YouTube
                            videoId={currentVideo.id}
                            opts={opts}
                            onEnd={this.playNextVideo}
                        />

                        <List
                            style={{ marginTop: "1rem", marginBottom: "1rem" }}
                            // bordered
                            dataSource={listRadios}
                            renderItem={item => (
                                <List.Item
                                    style={{
                                        cursor: "pointer",
                                        color :
                                            item.id === currentVideo.id
                                                ? "blue"
                                                : "black",
                                    }}
                                    onClick={() => this.playVideo(item.id)}
                                >
                                    {item.title}
                                </List.Item>
                            )}
                        />

                        <Button type="primary" size="large">
                            <Icon type="upload" />
                            Gửi thêm bài hát
                        </Button>
                    </div>
                </div>
            </Content>
        );
    }
}

export default Radio;
