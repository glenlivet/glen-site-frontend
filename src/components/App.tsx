import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import { PrivateRoute } from "../services/authService";
import LoginForm from "./LoginForm";
import FileList from "./FileList";
import Markdown from "./Markdown";
import TopMenubar from "./TopMenubar";
import SideMenubar from "./SideMenubar";

import "./App.scss";

class App extends Component<any, any> {
  render() {
    return (
      <Router>
        <div className="App">
          <TopMenubar />
          <div className="g-page-view p-d-flex">
            <SideMenubar />
            <div className="g-article-container p-col">
              <Switch>
                <PrivateRoute path="/files">
                  <FileList />
                </PrivateRoute>
                <Route path="/Dashboard">
                  <Markdown />
                </Route>
                <Route exact path="/">
                  <div className="p-d-flex p-jc-center p-mt-2">
                    <LoginForm redirectUrl="/dashboard" />
                  </div>
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
