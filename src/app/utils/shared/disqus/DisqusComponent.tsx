import React, { Component } from "react";
import Disqus from "disqus-react";

type Props = {
    guid: string;
    title: string;
};

interface IDisqusConfig {
    url: string;
    indentifier: string;
    title: string;
}

class DisqusComponent extends Component<Props> {
    render() {
        if (typeof window !== "undefined") {
            const { guid, title }: Props = this.props;

            const disqusConfig: IDisqusConfig = {
                url        : window.location.href,
                indentifier: guid,
                title      : title,
            };

            return (
                <Disqus.DiscussionEmbed
                    shortname="fptu-tech"
                    config={disqusConfig}
                />
            );
        } else {
            return null;
        }
    }
}

export default DisqusComponent;
