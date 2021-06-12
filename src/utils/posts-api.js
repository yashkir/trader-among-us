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

async function create(data) {
  const payload = {
    title: data.title,
    text: data.text,
  }

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    return "Post created successfully."
  } else {
    throw new Error("Unable to create post.");
  }
}

module.exports = {
  getAllPosts,
  create,
}
