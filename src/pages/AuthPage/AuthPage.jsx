import React from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import PageTitle from "../../components/PageTitle/PageTitle"

export default function AuthPage({ setUser }) {
  return (
    <div>
      <PageTitle titleOne={"SIGN"} titleTwo={"UP"} />
      <SignUpForm setUser={setUser} />
    </div>
  );
}
