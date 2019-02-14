import React, { Component } from "react";

import { Layout } from "antd";

const { Footer } = Layout;

class FooterPage extends Component {
    render() {
        return (
            <Footer style={{ textAlign: "center" }}>
                <div>
                    <strong>FPTU</strong>
.
                    <strong>Tech</strong>
                    {' '}
©2019 Developed
                    by
                    {" "}
                    <strong>
                        <a
                            href="https://mrhmt.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            PRC391 FUHCM Project
                        </a>
                    </strong>
                    . Built on top of Golang & ReactJS, hosted at AWS.
                </div>

                <div style={{ marginTop: "10px" }}>
                    <img
                        src="/assets/images/icons/golang.png"
                        width="50px"
                        alt="golang"
                        title="Golang"
                    />
                    <img
                        src="/assets/images/icons/nodejs.png"
                        width="50px"
                        alt="nodejs"
                        title="NodeJS"
                    />
                    <img
                        src="/assets/images/icons/react.png"
                        width="50px"
                        alt="reactjs"
                        title="ReacJS"
                    />
                    <img
                        src="/assets/images/icons/typescript.png"
                        width="50px"
                        alt="typescript"
                        title="TypeScript"
                    />
                    <img
                        src="/assets/images/icons/mysql.png"
                        width="50px"
                        alt="mysql"
                        title="MySQL"
                    />
                    <img
                        src="/assets/images/icons/docker.png"
                        width="50px"
                        alt="docker"
                        title="Docker"
                    />
                    <img
                        src="/assets/images/icons/kubernetes.png"
                        width="50px"
                        alt="kubernetes"
                        title="Kubernetes"
                    />
                    <img
                        src="/assets/images/icons/jenkins.png"
                        width="50px"
                        alt="jenkins"
                        title="Jenkins"
                    />
                    <img
                        src="/assets/images/icons/elastic.png"
                        width="50px"
                        alt="elastic"
                        title="Elastic Search"
                    />
                    <img
                        src="/assets/images/icons/aws.png"
                        width="50px"
                        alt="aws"
                        title="Amazon Web Service"
                    />
                </div>
            </Footer>
        );
    }
}

export default FooterPage;
