import React, { Component } from "react";

import { Layout, Skeleton, Button } from "antd";

const { Content } = Layout;

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radios : [],
            loading: true,
            synced : true,
        };
    }
    async componentDidMount() {
        try {
            const { radios } = await FPTUSDK.radio.getRadios();
            const arr = radios ? JSON.parse(radios) : [];
            this.setState({ radios: arr, loading: false });
        } catch (err) {
            throw err;
        }
    }
    doUpdate = arr => {
        this.setState({ radios: arr });
        this.setState({ synced: false });
    };
    doSync = () => {
        const { radios } = this.state;
        const str = JSON.stringify(radios);
        FPTUSDK.radio.setRadios(str).finally(() => {
            this.setState({ synced: true });
        });
    };
    handleUpdate = obj => {
        const { radios } = this.state;
        const newRadios = radios.map(e => {
            if (e.id === obj.id) {
                return obj;
            }

            return e;
        });

        this.doUpdate(newRadios);
    };
    handleRemove = arr => {
        const { radios } = this.state;
        const newRadios = radios.filter((_, i) => !arr.includes(i));

        this.doUpdate(newRadios);
    };
    handleAdd = obj => {
        const { radios } = this.state;
        const newObj = [obj];

        const newRadios = radios.concat(newObj);

        this.doUpdate(newRadios);
        return true;
    };
    render() {
        const { radios, loading, synced } = this.state;

        if (typeof window !== "undefined" && !loading) {
            const { SchemaTypes, ArrayEditor } = require("object-editor-react");

            const schema = {
                id: SchemaTypes.string({ required: true }),

                title: SchemaTypes.string({ required: true }),

                top: SchemaTypes.string({ required: false }),
            };

            return (
                <Content className="content-container">
                    <div className="content-wrapper">
                        <div style={{ marginBottom: "1rem" }}>
                            Trạng thái:
                            {" "}
                            <strong>{synced ? "Đã lưu" : "Chưa lưu"}</strong>
                            <Button
                                style={{ marginLeft: "1rem" }}
                                type="primary"
                                onClick={this.doSync}
                                disabled={synced}
                            >
                                Lưu thay đổi
                            </Button>
                        </div>
                        <ArrayEditor
                            type={schema}
                            object={radios}
                            onUpdateElement={this.handleUpdate}
                            onRemoveElements={this.handleRemove}
                            onAddElement={this.handleAdd}
                        />
                    </div>
                </Content>
            );
        }

        return (
            <Content className="content-container">
                <div className="content-wrapper">
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                </div>
            </Content>
        );
    }
}

export default Loading;
