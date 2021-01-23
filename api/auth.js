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

  return response;
}

export async function postRegister({ username, password, email, fullName }) {
  const url = apiUrl("/users");

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
      email,
      full_name: fullName,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}
