import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

export default function LoginForm() {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  function handleChange(e) {
    const key = e.currentTarget.id;
    setInputs({
      ...inputs,
      [key]: e.currentTarget.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    Meteor.loginWithPassword(inputs.username, inputs.password);
  }

  return (
    <form action="POST" onSubmit={handleSubmit}>
      <label htmlFor="username">
        Username
        <input
          type="text"
          name="username"
          id="username"
          value={inputs.username}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          type="password"
          name="password"
          id="password"
          value={inputs.password}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Log In</button>
    </form>
  );
}
