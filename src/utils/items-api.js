import { getToken } from "./users-service";

const BASE_URL = "/api/items";

async function create(formData) {
  
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    body: formData,
  });

  if (res.ok) {
    return res.json;
  } else {
    throw new Error("Unable to create Item");
  }
}

const itemsApi = {
  create,
};

export default itemsApi;