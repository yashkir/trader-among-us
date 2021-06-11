import React, { Component } from "react";
import { signUp } from "../../utils/users-service";


export default class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: "",
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, password, email } = { ...this.state };
      const userData = { name, password, email };
      const user = await signUp(userData);
      this.props.setUser(user);

    } catch {
      this.setState({ error: "Sign up Failed" });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>

        <div className="form-container">
          <section id="form-sec">
            <form autoComplete="off" onSubmit={this.handleSubmit}>
              <div className="form-border">
                <label className="form-label">Username</label>
                <input
                  className="form-input"
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  required
                />
                <br />
                <label className="form-label">Email</label>
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                />
                <br />
                <label className="form-label">Password</label>
                <input
                  className="form-input"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
                <br />
                <label className="form-label">Confirm</label>
                <input
                  className="form-input"
                  type="password"
                  name="confirm"
                  value={this.state.confirm}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="btn-div">
                <button className="submit-btn" type="submit" disabled={disable}>
                  SIGN UP
            </button>
              </div>
            </form>
          </section>
        </div>
        <p className="error-message">{this.state.error}</p>
      </div>
    );
  }
}
