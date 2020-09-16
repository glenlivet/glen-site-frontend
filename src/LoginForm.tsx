import React, { Component } from "react";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";

class LoginForm extends Component<any, any> {
  render() {
    return (
      <form className="p-fluid">
        <div className="p-field">
          <label htmlFor="username">Username</label>
          <InputText id="username" name="username" type="text" />
        </div>
        <div className="p-field">
          <label htmlFor="password">Password</label>
          <Password id="password" name="password" type="text" />
        </div>
        <Button label="Sign in" />
      </form>
    );
  }
}

export default LoginForm;
