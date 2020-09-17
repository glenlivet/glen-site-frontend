import React, { Component } from "react";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { Message } from 'primereact/message';

import { Redirect } from "react-router-dom";

import "./LoginForm.scss";

interface OwnProps {
  username?: string; // browser cached username
  password?: string; // browser cached password
  errorMsg?: string; // error message
  redirectUrl: string; // redirect
}

interface OwnState {
  username: string;
  password: string;
  errorMsg: string;
  status: number;
}

const STATE_INIT = 0;
const STATE_SUCCESSFUL = 1;
const STATE_FAILED = 2;

class LoginForm extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: props.username || "",
      password: props.password || "",
      errorMsg: props.errorMsg || "Invalid username/password.",
      status: props.status || STATE_INIT,
    };
  }

  onSubmit = async () => {
    this.setState({status: STATE_SUCCESSFUL});
  };

  render() {
    return (
      <div>
      <div className="p-fluid p-mb-2">
        <Message severity="error" text={this.state.errorMsg}></Message>
      </div>
      <div className="p-fluid p-p-5 login-form">
        <div className="p-field">
          <label htmlFor="username">Username</label>
          <InputText
            name="username"
            type="text"
            value={this.state.username}
            onChange={(e) => this.setState({ username: (e.target as HTMLInputElement).value })}
          />
        </div>
        <div className="p-field">
          <label htmlFor="password">Password</label>
          <Password
            name="password"
            type="text"
            value={this.state.password}
            onChange={(e) => this.setState({ password: (e.target as HTMLInputElement).value })}
          />
        </div>
        <Button label="Sign in" onClick={this.onSubmit} />
        {this.state.status === STATE_SUCCESSFUL && (
          <Redirect to={this.props.redirectUrl} />
        )}
      </div>
      </div>
    );
  }
}

export default LoginForm;
