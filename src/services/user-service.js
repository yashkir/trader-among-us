

export async function signUp(userData) {
  try {
    const token = await fetch("/api/users", {
      method: "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    return token;
  } catch {
    throw new Error('Invalid Sign Up');
  }
}
