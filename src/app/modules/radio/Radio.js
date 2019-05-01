import React, { Component } from "react";

import { Layout } from "antd";

import Helmet from "react-helmet-async";
import YouTube from "react-youtube";

const { Content } = Layout;

Array.prototype.randomElement = function() {
    return this[Math.floor(Math.random() * this.length)];
};

class Radio extends Component {
    render() {
        const opts = {
            height    : "585",
            width     : "960",
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
            },
        };

        const listRadios = [
            {
                id   : "2sIC1sh-yc0",
                title: "MIN - ĐỪNG YÊU NỮA, EM MỆT RỒI | OFFICIAL MUSIC VIDEO",
            },
            {
                id   : "iE52-XXnQqs",
                title:
                    "AMEE x B RAY - ANH NHÀ Ở ĐÂU THẾ | Official Music Video",
            },
            {
                id   : "95ahbau-rJk",
                title: "Ex's Hate Me - B Ray x Masew (Ft AMEE) | Official MV",
            },
            {
                id   : "KREnGJE0vXQ",
                title:
                    "Duyên - Huỳnh Tú ft Khói ft Magazine | Official Music Video",
            },
            {
                id   : "f-ozNHov4DM",
                title: "Crush on you 🌸 Xin. | Lyric Video",
            },
            {
                id   : "VmbK1EKvm9Y",
                title:
                    "OFFICIAL MV | Lena & CrazyFrogs // Ôi tình yêu thật điêu.",
            },
        ];

        return (
            <Content className="content-container">
                <Helmet>
                    <title>Radio - FPTU HCM Confessions</title>
                </Helmet>
                <div className="content-wrapper">
                    <div style={{ textAlign: "center" }}>
                        <YouTube
                            videoId={listRadios.randomElement().id}
                            opts={opts}
                            onReady={this._onReady}
                        />
                    </div>
                </div>
            </Content>
        );
    }
}

export default Radio;
