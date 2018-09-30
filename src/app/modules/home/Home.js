import React, { Component } from "react";
import "./Home.css";
import Exception from "ant-design-pro/lib/Exception";

import { Layout, Button } from "antd";

const { Content } = Layout;

class Home extends Component {
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
                    {/* <video controls className="home-video">
                        <source
                            src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t66.18014-6/30642662_216616559196126_5297810338946876100_n.mp4?_nc_cat=109&efg=eyJ2ZW5jb2RlX3RhZyI6Im9lcF9oZCJ9&oh=bef6c4f59283297955938e10164fd3ed&oe=5C237C4D"
                            type="video/mp4"
                        />
                    </video> */}
                    <Exception
                        type="500"
                        actions={<Button type="primary">tới trang gửi confess</Button>}
                        title="fptu.cf"
                        desc="sad, giờ méo có gì hết á, đi gửi confession nha?"
                    />
                </div>
            </Content>
        );
    }
}

export default Home;
