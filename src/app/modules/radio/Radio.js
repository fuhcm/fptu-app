import React, { Component } from "react";

import "./Radio.scss";

import { Layout, List, Spin, Tag, Skeleton, Switch } from "antd";

import Helmet from "react-helmet-async";
import YouTube from "react-youtube";

const { Content } = Layout;

Array.prototype.randomElement = function() {
  return this[Math.floor(Math.random() * this.length)];
};

class Radio extends Component {
  state = {
    currentVideo: null,
    online      : Math.floor(Math.random() * 11),
    hideList    : false,
    radios      : [],
    loading     : true,
  };
  async componentDidMount() {
    try {
      const { radios: radiosStr } = await FPTUSDK.radio.getRadios();
      const radios = JSON.parse(radiosStr);

      radios.sort((a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
      this.setState({
        radios,
        currentVideo: radios.randomElement(),
        loading     : false,
      });
    } catch (err) {
      throw err;
    }

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
    const { radios } = this.state;
    this.setState({
      currentVideo: radios.randomElement(),
    });
  };
  playVideo = id => {
    const { radios } = this.state;
    const index = radios.findIndex(e => e.id === id);
    if (index !== -1) {
      this.setState({
        currentVideo: radios[index],
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

    const { radios, currentVideo, online, hideList, loading } = this.state;

    if (loading) {
      return (
        <Content
          className="content-container"
          style={{ background: "#FAEBCA" }}
        >
          <div className="content-wrapper">
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </div>
        </Content>
      );
    }

    return (
      <Content className="content-container" style={{ background: "#FAEBCA" }}>
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
người đang nghe Radio với bạn
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
                dataSource={radios}
                renderItem={item => (
                  <List.Item
                    className={
                      item.id === currentVideo.id ? "selected-row" : ""
                    }
                    style={{
                      cursor: item.id === currentVideo.id ? "unset" : "pointer",
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
                    {item.top && (
                      <Tag color="blue">
Top #1
                        {item.top.toUpperCase()}
                      </Tag>
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
