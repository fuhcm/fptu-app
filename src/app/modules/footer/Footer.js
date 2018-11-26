import React, { Component } from "react";

import { config } from "../../../config";

import { Layout, Button, Icon } from "antd";

const { Footer } = Layout;

class FooterPage extends Component {
    render() {
        return (
            <Footer style={{ textAlign: "center" }}>
                <div>
                    {config.meta.name} ©2018 Designed by{" "}
                    <strong>Gosu Team</strong>. Built on top of Golang &
                    ReactJS, hosted at Google Cloud Platform.
                </div>

                <div
                    style={{
                        marginTop: "10px",
                    }}
                >
                    <a
                        href="https://github.com/gosu-team"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button type="default" size="small">
                            <Icon type="github" />
                            Wanna contribute to Development Team?
                        </Button>
                    </a>
                </div>

                <div style={{ marginTop: "10px" }}>
                    <img
                        src="https://i.imgur.com/GsdNJA1.png"
                        width="50px"
                        alt="golang"
                    />
                    <img
                        src="https://i.imgur.com/dFGn248.png"
                        width="50px"
                        alt="react"
                    />
                    <img
                        src="https://i.imgur.com/b3EjHhg.png"
                        width="50px"
                        alt="mysql"
                    />
                    <img
                        src="https://i.imgur.com/9BqSCEg.png"
                        width="50px"
                        alt="docker"
                    />
                    <img
                        src="https://i.imgur.com/BQOhJ4j.png"
                        width="50px"
                        alt="gcp"
                    />
                </div>
            </Footer>
        );
    }
}

export default FooterPage;
