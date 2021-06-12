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

module.exports = {
  getAllPosts
}
