export async function fetchAllMedia() {
  const url = "http://media.mw.metropolia.fi/wbma/media/all";

  const response = await fetch(url);

  return await response.json();
}

export async function fetchMediaById(id) {
  const url = `http://media.mw.metropolia.fi/wbma/media/${id}`;

  const response = await fetch(url);

  return await response.json();
}
