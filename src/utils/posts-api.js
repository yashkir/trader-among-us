import { getToken } from './users-service';

const BASE_URL = "/api/posts";

async function getAllPosts() {
  const res = await fetch(BASE_URL, {
    method: "GET",
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Unable to retrieve posts.");
  }
}


async function getOnePost(id) {
  const res = await fetch(`${BASE_URL}/${id}`,
    { method: "GET" }
  );
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Unable to retrieve posts.");
  }
}

async function create(data) {
  const payload = {
    title: data.title,
    text: data.text,
  };

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getToken(),
    },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    return "Post created successfully."
  } else {
    throw new Error("Unable to create post.");
  }
}

async function makeBid(postId, data) {
  const payload = {
    items: data.items,
    text: data.description,
  };

  const res = await fetch(`${BASE_URL}/${postId}/reply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getToken(),
    },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    return "Bid created successfully.";
  } else {
    throw new Error("Unable to create bid.");
  }
}

const postsApi = {
  getAllPosts,
  create,
  getOnePost,
  makeBid,
};

export default postsApi;
