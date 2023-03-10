import { createContext, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
export const ApiContext = createContext();

export const ApiContextProvider = ({ children }) => {
  const BASE_URL = "http://10.0.0.18:4000/api/";
  const { user } = useAuthContext();
  const apiCall = async (
    url,
    method = "GET",
    body,
    contentType = "application/json"
  ) => {
    const customURL = BASE_URL + url;
    const result = await fetch(customURL, {
      headers: {
        "Content-Type": contentType,
        Authorization: `Bearer ${user?.token}`,
      },
      method: method,
      body: JSON.stringify(body),
    });
    const json = await result.json();
    if (result.status != 200) {
      if (result.status === 401) {
        throw "you_are_not_authorized";
      }
      throw {
        status: result.status,
        ...json,
      };
    }
    return { status: result.status, data: json };
  };

  return (
    <ApiContext.Provider value={{ apiCall }}>{children}</ApiContext.Provider>
  );
};
