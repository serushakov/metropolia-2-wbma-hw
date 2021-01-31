import { apiUrl } from "./constants";

export async function fetchAllMedia() {
  const url = apiUrl("/media/all");

  const response = await fetch(url);

  return await response.json();
}

export async function fetchMediaById(id) {
  const url = apiUrl(`/media/${id}`);

  const response = await fetch(url);

  return await response.json();
}

export async function fetchMediaByTag(tag) {
  const url = apiUrl(`/tags/${encodeURI(tag)}`);

  const response = await fetch(url);

  if (response.status !== 200) {
    throw Error("not found");
  }

  return await response.json();
}
