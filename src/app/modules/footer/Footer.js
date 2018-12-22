import React, { Component } from "react";

import { Layout } from "antd";

const { Footer } = Layout;

class FooterPage extends Component {
    render() {
        return (
            <Footer style={{ textAlign: "center" }}>
                <div>
                    <strong>FPTU</strong> dot <strong>Tech</strong> ©2018
                    Developed by{" "}
                    <strong>
                        <a
                            href="https://github.com/huynhminhtufu"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Huynh Minh Tu
                        </a>
                    </strong>
                    . Built on top of Golang & ReactJS, hosted at GCP.
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
                        alt="reactjs"
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
