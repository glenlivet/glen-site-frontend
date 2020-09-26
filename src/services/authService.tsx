import React from "react";
import { Redirect, Route } from "react-router-dom";

import { API_POST_LOGIN } from "../constants/apis";

const STORAGE_KEY_USER = "current_user";

export const requestLogin = async (username: string, password: string) => {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);
  const resp = await fetch(API_POST_LOGIN, {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return resp;
};

export const handleLoginOkResp = async (resp: Response) => {
  if (!localStorage) {
    throw new Error("The browser is not supported!");
  }
  localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(await resp.json()));
};

const getJwtToken = () => {
  try {
    const userStr = localStorage.getItem(STORAGE_KEY_USER);
    if (userStr) {
      return JSON.parse(userStr).token;
    }
    throw new Error();
  } catch (e) {
    throw new Error("The user token not found!");
  }
};

export const authHeaders = (headers?: Headers) => {
  if (!headers) {
    headers = new Headers();
  }
  headers.append("Authorization", `Bearer ${getJwtToken()}`);
  return headers;
};

const isAuthenticated = () => {
  if (!localStorage) {
    throw new Error("The browser is not supported!");
  }
  const user = localStorage.getItem(STORAGE_KEY_USER);
  if (!user) {
    return false;
  } else {
    return true;
  }
};

export const PrivateRoute = ({ children, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
