const TOKEN = "TOKEN";

export const setToken = (token) => {
  localStorage.setItem(TOKEN, JSON.stringify(token));
};
export const getToken = () => {
  return JSON.parse(localStorage.getItem(TOKEN), null);
};
export const removeToken = () => {
  localStorage.removeItem(TOKEN);
};
