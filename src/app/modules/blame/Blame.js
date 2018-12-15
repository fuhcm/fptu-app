import React, { Component } from "react";

import { FacebookProvider, Comments } from "react-facebook";

import { Layout } from "antd";

const { Content } = Layout;

class Blame extends Component {
    render() {
        return (
            <Content className="content-container">
                <div
                    style={{
                        background: "#fff",
                        padding: "2rem",
                        textAlign: "center",
                    }}
                >
                    <div
                        style={{
                            textAlign: "center",
                            marginBottom: "2rem",
                            backgroundColor: "#000",
                            color: "#fff",
                            borderRadius: "10px",
                            padding: "1rem",
                        }}
                    >
                        <img
                            src="https://i.imgur.com/tbUpPtP.png"
                            alt="FPTU HCM Confessions"
                            style={{ maxWidth: "200px" }}
                        />
                        <p style={{ fontSize: "1rem" }}>
                            Ức chế gì cứ xả vào đây đê!!
                        </p>
                    </div>
                    <FacebookProvider appId="505017836663886">
                        <Comments href="https://fptu.tech/blame" />
                    </FacebookProvider>
                </div>
            </Content>
        );
    }
}

export default Blame;
