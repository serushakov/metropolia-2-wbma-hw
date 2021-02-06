import axios from "axios";
import { extractImageMimeType } from "../utils";
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

export async function postMedia(title, description, image, token) {
  const url = apiUrl(`/media`);

  const formData = new FormData();

  const filename = image.uri.split("/").pop();

  formData.append("title", title);
  formData.append("description", description);
  formData.append("file", {
    uri: image.uri,
    name: filename,
    type: extractImageMimeType(filename),
  });

  return axios.post(url, formData, {
    headers: {
      "content-type": "multipart/form-data",
      "x-access-token": token,
    },
  });
}
