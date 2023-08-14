// import React from "react";
import axios from "axios";
export async function axiosFetch(url) {
  const authPost = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  try {
    const response = await authPost(url);
    console.log(response);
    const data = response.data;
    if (String(response.status).startsWith("2")) return data;
  } catch (err) {
    if (err?.response?.data?.error) {
      return { message: err?.response?.data?.error, status: "error" };
    }
    return { message: "something went wrong", status: "error" };
  }
}
