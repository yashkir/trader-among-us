import React from 'react'
import Form from '../../components/Form/Form'

export default function NewPostPage({ user }) {
  console.log(user);
  return (
    <div>
      <Form user={user}/>
    </div>
  )
}
