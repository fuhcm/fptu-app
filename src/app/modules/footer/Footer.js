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
                            Huynh Minh Tu
                        </a>
                    </strong>
                    . Built on top of Go & React, hosted at Heroku & Netlify.
                </div>

                <div style={{ marginTop: "10px" }}>
                    <img
                        src="/assets/images/icons/golang.png"
                        width="50px"
                        alt="golang"
                        title="Golang"
                    />
                    <img
                        src="/assets/images/icons/typescript.png"
                        width="50px"
                        alt="typescript"
                        title="TypeScript"
                    />
                    <img
                        src="/assets/images/icons/nodejs.png"
                        width="50px"
                        alt="nodejs"
                        title="Node.js"
                        style={{
                            padding: "0px 5px",
                        }}
                    />
                    <img
                        src="/assets/images/icons/react.png"
                        width="50px"
                        alt="react"
                        title="React"
                    />
                    <img
                        src="/assets/images/icons/mysql.png"
                        width="50px"
                        alt="mysql"
                        title="MySQL"
                        style={{
                            padding: "0px 5px",
                        }}
                    />
                    <img
                        src="/assets/images/icons/docker.png"
                        width="50px"
                        alt="docker"
                        title="Docker"
                    />
                    {/* <img
                        src="/assets/images/icons/jenkins.png"
                        width="50px"
                        alt="jenkins"
                        title="Jenkins"
                    />
                    <img
                        src="/assets/images/icons/eks.png"
                        width="150px"
                        alt="eks"
                        title="Amazon Elastic Container Service for Kubernetes"
                    /> */}
                    <img
                        src="/assets/images/icons/heroku.png"
                        width="50px"
                        alt="heroku"
                        title="Heroku"
                    />
                    <img
                        src="/assets/images/icons/netlify.png"
                        width="50px"
                        alt="netlify"
                        title="Netlify"
                    />
                </div>
            </Footer>
        );
    }
}

export default FooterPage;
