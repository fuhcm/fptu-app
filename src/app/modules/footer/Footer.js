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
©2019 Developed
                    by
                    {" "}
                    <strong>
                        <a
                            href="https://github.com/gosu-team"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Huỳnh Minh Tú
                        </a>
                    </strong>
                    . Built on top of Golang & ReactJS, hosted at GCP.
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
                        src="/assets/images/icons/gcp.png"
                        width="50px"
                        alt="gcp"
                        title="Google Cloud Platform"
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
                        src="/assets/images/icons/grafana.png"
                        width="50px"
                        alt="grafana"
                        title="Grafana"
                    />
                </div>
            </Footer>
        );
    }
}

export default FooterPage;
