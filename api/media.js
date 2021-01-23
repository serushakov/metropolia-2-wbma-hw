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
