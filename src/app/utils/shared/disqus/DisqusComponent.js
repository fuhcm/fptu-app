import React from "react";
import Disqus from "disqus-react";

const DisqusComponent = ({ guid, title }) => {
    if (typeof window !== "undefined") {
        const disqusConfig = {
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
};

export default DisqusComponent;
