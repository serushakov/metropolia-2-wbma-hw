import { apiUrl } from "./constants";

export async function postLogin(username, password) {
  const url = apiUrl("/login");

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const content = await response.json();

  return content;
}
