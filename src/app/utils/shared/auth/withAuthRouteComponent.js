import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import LocalStorageUtils from "@utils/browser/LocalStorage";

const withAuthRouteComponent = redirectUrl => Child =>
  class RequireAuthorizedComponent extends Component {
    constructor() {
      super();
      if (typeof window !== "undefined" && typeof document !== "undefined") {
        // When constructing component in DOM env
        this.renderFn = this._renderIfAuthenticated;
      } else {
        this.renderFn = this._renderWithoutAuthenticated;
      }
    }
    _renderIfAuthenticated = () => {
      const { props } = this;
      if (LocalStorageUtils.isAuthenticated()) {
        return <Child {...props} />;
      } else {
        return <Redirect to={redirectUrl} />;
      }
    };

    _renderWithoutAuthenticated = () => {
      return <Child {...this.props} />;
    };

    render() {
      return this.renderFn();
    }
  };

export default withAuthRouteComponent;
