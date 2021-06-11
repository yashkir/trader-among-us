import React from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";

export default function AuthPage({ setUser }) {
  return (
    <div>
      <h1>AuthPage</h1>
      <SignUpForm setUser={setUser} />
    </div>
  );
}