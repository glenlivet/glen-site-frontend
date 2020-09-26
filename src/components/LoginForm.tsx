import React, { Component } from "react";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { Redirect } from "react-router-dom";

import { requestLogin, handleLoginOkResp } from "../services/authService";

import "./LoginForm.scss";

const STATE_INIT = 0;
const STATE_SUCCESSFUL = 1;
const STATE_FAILED = 2;

const ERROR_MSG_SYS_NETWORK = "Network or System issues.";
const ERROR_MSG_INVALID = "Invalid username/password.";

class LoginForm extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: props.username || "",
      password: props.password || "",
      errorMsg: props.errorMsg || ERROR_MSG_INVALID,
      status: props.status || STATE_INIT,
    };
  }

  onSubmit = async () => {
    let resp: Response;
    try {
      resp = await requestLogin(this.state.username, this.state.password);
      if (resp.ok) {
        this.setState({ status: STATE_SUCCESSFUL });
        handleLoginOkResp(resp);
      } else {
        this.setState({ status: STATE_FAILED });
        if (resp.status >= 400 && resp.status < 500) {
          this.setState({ errorMsg: ERROR_MSG_INVALID });
          console.error(await resp.text());
        } else {
          console.error(await resp.text());
          this.setState({ errorMsg: ERROR_MSG_SYS_NETWORK });
        }
      }
    } catch (e) {
      console.error(e);
      this.setState({ status: STATE_FAILED });
      this.setState({ errorMsg: ERROR_MSG_SYS_NETWORK });
    }
  };

  render() {
    return (
      <div>
        {this.state.status >= STATE_FAILED && (
          <div className="p-fluid p-mb-2">
            <Message severity="error" text={this.state.errorMsg}></Message>
          </div>
        )}
        <div className="p-fluid p-p-5 login-form">
          <div className="p-field">
            <label htmlFor="username">Username</label>
            <InputText
              name="username"
              type="text"
              value={this.state.username}
              onChange={(e) =>
                this.setState({
                  username: (e.target as HTMLInputElement).value,
                })
              }
            />
          </div>
          <div className="p-field">
            <label htmlFor="password">Password</label>
            <Password
              name="password"
              type="text"
              value={this.state.password}
              onChange={(e) =>
                this.setState({
                  password: (e.target as HTMLInputElement).value,
                })
              }
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
