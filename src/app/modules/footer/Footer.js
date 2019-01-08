import React, { PureComponent } from "react";

import { Layout } from "antd";

const { Footer } = Layout;

class FooterPage extends PureComponent {
    render() {
        return (
            <Footer style={{ textAlign: "center" }}>
                <div>
                    <strong>FPTU</strong>
.
                    <strong>Tech</strong>
                    {' '}
©2018 Developed
                    by
                    {" "}
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
                        src="/assets/images/icons/golang.png"
                        width="50px"
                        alt="golang"
                    />
                    <img
                        src="/assets/images/icons/nodejs.png"
                        width="50px"
                        alt="nodejs"
                    />
                    <img
                        src="/assets/images/icons/react.png"
                        width="50px"
                        alt="reactjs"
                    />
                    <img
                        src="/assets/images/icons/mysql.png"
                        width="50px"
                        alt="mysql"
                    />
                    <img
                        src="/assets/images/icons/docker.png"
                        width="50px"
                        alt="docker"
                    />
                    <img
                        src="/assets/images/icons/gcp.png"
                        width="50px"
                        alt="gcp"
                    />
                    <img
                        src="/assets/images/icons/kubernetes.png"
                        width="50px"
                        alt="kubernetes"
                    />
                    <img
                        src="/assets/images/icons/elastic.png"
                        width="50px"
                        alt="elastic"
                    />
                    <img
                        src="/assets/images/icons/jenkins.png"
                        width="50px"
                        alt="jenkins"
                    />
                </div>
            </Footer>
        );
    }
}

export default FooterPage;
