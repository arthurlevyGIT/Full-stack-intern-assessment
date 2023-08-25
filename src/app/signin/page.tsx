'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/authContext';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(`/api/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.status === 200) {
        // Saving the JWT token to localStorage
        const accessToken = (await response.json()).accessToken;
        localStorage.setItem('accessToken', accessToken);
        login();
        router.push('/');
      } else {
        setErrorMessage('Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={submitData}>
          <h1>Signin user</h1>
          <input
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="text"
            value={email}
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="text"
            value={password}
          />
          <input disabled={!email || !password} type="submit" value="Signin" />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <a href="/">or Cancel</a>
        </form>
      </div>
    </>
  );
}