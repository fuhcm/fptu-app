import renderer from "react-test-renderer";
import React from "react";
import Send from "../../../../app/modules/send/Send";

describe("Modules > Send", () => {
    it("Render a snapshop for Send use renderer", () => {
        const tree = renderer.create(<Send />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
