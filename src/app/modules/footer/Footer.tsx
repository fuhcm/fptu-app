import React, { Component } from "react";

import { withRouter } from "react-router-dom";

import { Layout, Tooltip } from "antd";

const { Footer } = Layout;

type Props = {
    location: Location;
};

type Location = {
    pathname: String;
};

class FooterPage extends Component<Props> {
    render() {
        const { location } = this.props;
        const isRadio: boolean = location.pathname === "/radio" ? true : false;

        return (
            <Footer
                style={{
                    textAlign: "center",
                    background: isRadio ? "#FAEBCA" : "unset",
                }}
            >
                <div>
                    <strong>FUHCM</strong>.<strong>com</strong> ©2019 Developed
                    by{" "}
                    <Tooltip title="I am not FPTU HCM Confessions (or related) and hence not responsible for the content (or approval) posted on the fanpage">
                        <strong>
                            <a
                                href="https://tuhuynh.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Huynh Minh Tu
                            </a>
                        </strong>
                    </Tooltip>
                    .
                </div>
            </Footer>
        );
    }
}

export default withRouter(FooterPage);
