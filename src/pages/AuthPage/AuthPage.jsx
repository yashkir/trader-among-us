import React, { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import PageTitle from "../../components/PageTitle/PageTitle";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./AuthPage.css";

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      {showLogin ? <PageTitle titleOne={"SIGN"} titleTwo={"UP"} /> : <PageTitle titleOne={"LOG"} titleTwo={"IN"} />}
      {!showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
      {showLogin ? <p className="AuthPage log-p">Already Have an Account?</p> : <p className="AuthPage log-p">Don&apos;t Have an Account?</p>}
      <div className='AuthPage btn-contain-flex'>
        <div className='AuthPage ctr-btn'>
          <button className="AuthPage log-toggle" onClick={() => setShowLogin(!showLogin)}>{!showLogin ? "Sign Up" : "Log In"}</button>
        </div>
      </div>
    </div>
  );
}
