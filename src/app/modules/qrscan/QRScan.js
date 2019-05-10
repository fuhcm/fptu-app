import React, { Component } from "react";
import QrReader from "react-qr-reader";

import { Layout } from "antd";

const { Content } = Layout;

class QRScan extends Component {
    state = {
        result: "No result!",
    };

    handleScan = data => {
        if (data) {
            this.setState({
                result: data,
            });
        }
    };
    handleError = err => {
        console.error(err);
    };

    render() {
        return (
            <Content className="content-container">
                <div
                    style={{
                        background: "#fff",
                        padding   : "2rem",
                        textAlign : "center",
                    }}
                >
                    <QrReader
                        delay={300}
                        onError={this.handleError}
                        onScan={this.handleScan}
                        style={{ width: "100%" }}
                    />
                    <div style={{ marginTop: "1rem", fontSize: "2rem" }}>
                        {this.state.result}
                    </div>
                </div>
            </Content>
        );
    }
}

export default QRScan;
