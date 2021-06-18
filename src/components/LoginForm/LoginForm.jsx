import { useState } from 'react';
import { useHistory } from "react-router-dom";
import * as usersService from '../../utils/users-service';
import './LoginForm.css'

export default function LoginForm({ setUser }) {
  const history = useHistory()
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await usersService.login(credentials);
      setUser(user);
      history.push('/posts')
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <div>
      <div className="form-container" onSubmit={handleSubmit}>
        <section id="form-sec">
          <form autoComplete="off" >
            <div className="form-border">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                type="text"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required />
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required />
            </div>
            <div className="btn-div">
              <button className="submit-btn" type="submit">LOG IN</button>
            </div>
          </form>
        </section>
      </div>
      <p className="login-error-message">&nbsp;{error}</p>
    </div>
  );
}