import { getToken } from "./users-service";

const BASE_URL = "/api/posts";

export async function getMessages(postId, replyId) {
  const res = await fetch(`${BASE_URL}/${postId}/deals/${replyId}/messages`, {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + getToken(),
    },
  });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Unable to retrieve messages.");
  }
}

export async function sendMessage(postId, replyId, message) {
  const payload = {
    message: message
  };

  const res = await fetch(`${BASE_URL}/${postId}/deals/${replyId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getToken(),
    },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Unable to send message.");
  }
}
