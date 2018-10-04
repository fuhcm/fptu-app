import React, { Component } from "react";

import { config } from "../../../config";

import { Layout } from "antd";

const { Footer } = Layout;

class FooterPage extends Component {
    render() {
        return (
            <Footer style={{ textAlign: "center" }}>
                {config.meta.name} ©2018 Designed by <strong>Tu Huynh</strong>.
                Built on top of NodeJS & ReactJS.
            </Footer>
        );
    }
}

export default FooterPage;
