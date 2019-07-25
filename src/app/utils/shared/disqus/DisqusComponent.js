import React, { Component } from "react";
import Disqus from "disqus-react";

class DisqusComponent extends Component {
    render() {
        if (typeof window !== "undefined") {
            const { guid, title } = this.props;

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
