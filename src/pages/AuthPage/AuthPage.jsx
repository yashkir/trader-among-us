import React, { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import PageTitle from "../../components/PageTitle/PageTitle"
import LoginForm from "../../components/LoginForm/LoginForm";

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      <PageTitle titleOne={"SIGN"} titleTwo={"UP"} />
      <h1>AuthPage</h1>
      <button onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'Sign Up': 'Log In'}</button>
      {showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
    </div>
  );
}
