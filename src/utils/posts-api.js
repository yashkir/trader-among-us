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
    itemsOffered: data.itemsOffered,
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

/* postId is acually not used here, but keeping it for consistency
 * with the api route */
async function getOneDeal(postId, replyId) {
  const res = await fetch(`${BASE_URL}/${postId}/deals/${replyId}`,
    { method: "GET" }
  );
  if (res.ok) {
    return res.json();
  } else {
    return null;
  }
}

async function startDeal(postId, replyId) {
  const res = await fetch(`${BASE_URL}/${postId}/deals/${replyId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getToken(),
    },
  });

  console.log(res);
  if (res.ok) {
    return true;
  } else {
    throw new Error("Unable to start deal.");
  }
}

async function confirmDealToggle(postId, replyId) {
  const res = await fetch(`${BASE_URL}/${postId}/deals/${replyId}/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getToken(),
    },
  });

  if (res.ok) {
    return true;
  } else {
    throw new Error("Unable to confirm deal.");
  }
}

async function deleteDeal(postId, replyId) {
  const res = await fetch(`${BASE_URL}/${postId}/deals/${replyId}/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getToken(),
    },
  });

  if (res.ok) {
    return res;
  } else {
    throw new Error("Unable to confirm deal.");
  }
}

const postsApi = {
  getAllPosts,
  create,
  getOnePost,
  makeBid,
  getOneDeal,
  startDeal,
  confirmDealToggle,
  deleteDeal,
};

export default postsApi;
