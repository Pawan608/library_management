// import React from "react";
import axios from "axios";
// import { globalErrorHandler } from "../utility/globalErrorhandler";
export async function axiosPatch(url, CSRFToken, body) {
  const authPost = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    method: "patch",
    headers: {
      Accept: "application/json",
      "X-CSRFToken": CSRFToken,
    },
  });
  try {
    const response = await authPost.patch(url, body);
    const data = response.data;
    return data;
  } catch (err) {
    // console.log(err);
    // const errorMessage = globalErrorHandler(err);
    if (err?.response?.data?.error) {
      return { message: err?.response?.data?.error, status: "error" };
    }
    console.log(err);
    return { message: "something went wrong", status: "error" };
  }
}
