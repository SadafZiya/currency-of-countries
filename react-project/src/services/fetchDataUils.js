import { getToken } from "../utils/localStorages";

const BASE_URL = "http://localhost:4000/";
const BASE_URL_GRAPHQL = BASE_URL + "graphql";
const BASE_URL_LOGIN = BASE_URL + "login";

const FETCH_SETTING = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    token: getToken(),
  },
};

export const fetchDataLogin = (data) => {
  return fetchDataUils(BASE_URL_LOGIN, data);
};
export const fetchDataGraphql = (data) => {
  return fetchDataUils(BASE_URL_GRAPHQL, data);
};

const fetchDataUils = async (baseUrl, data) => {
  return await fetch(baseUrl, {
    ...FETCH_SETTING,
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((result) => result);
};
