import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Menubar } from "primereact/menubar";

import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import { PrivateRoute } from "../services/authService";
import LoginForm from "./LoginForm";
import FileList from "./FileList";

import "./App.scss";

const items = [
  {
    label: "Options",
    items: [
      {
        label: "New",
        icon: "pi pi-fw pi-plus",
        command: () => {
          window.location.hash = "/fileupload";
        },
      },
      {
        label: "Delete",
        icon: "pi pi-fw pi-trash",
        url: "http://primetek.com.tr",
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        label: "Options",
        icon: "pi pi-fw pi-cog",
        command: () => {
          window.location.hash = "/";
        },
      },
      { label: "Sign Out", icon: "pi pi-fw pi-power-off" },
    ],
  },
];

function Dashboard() {
  return <FileList />;
}

class App extends Component<any, any> {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/">
            <Menubar model={items} />
          </Route>
          <Switch>
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
            <Route exact path="/">
              <div className="p-d-flex p-jc-center p-mt-2">
                <LoginForm redirectUrl="/dashboard" />
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
