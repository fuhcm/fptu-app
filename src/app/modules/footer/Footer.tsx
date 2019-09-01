import React, { Component } from "react";

import { withRouter } from "react-router-dom";

import { Layout } from "antd";

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
                    textAlign : "center",
                    background: isRadio ? "#FAEBCA" : "unset",
                }}
            >
                <div>
                    <strong>FUHCM</strong>
.
                    <strong>com</strong>
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
                    . Built on top of Go & React, hosted at Heroku.
                </div>
            </Footer>
        );
    }
}

export default withRouter(FooterPage);
