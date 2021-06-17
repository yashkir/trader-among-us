import { getToken } from "./users-service";

const BASE_URL = "/api/items";

async function show(userId) {
  const res = await fetch(`/api/users/${userId}/items`)
  if (res.ok) {
    return res.json();
  }else{
    throw new Error ("Unable to retrieve Items. Sorry :(")
  }
}

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
  show,
};

export default itemsApi;