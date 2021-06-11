import * as usersAPI from './users-api';

export default async function signUp(userData) {
  try {
    const token = await usersAPI.signUp(userData)
    localStorage.setItem('token', token);
    return token;
  } catch {
    throw new Error('Invalid Sign Up');
  }
}
