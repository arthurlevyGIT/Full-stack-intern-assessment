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

  const handleSignin = async (e: React.SyntheticEvent) => {
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
        const userData = await response.json();
        localStorage.setItem('userData', JSON.stringify(userData));
        login();
        router.push('/');
      } else {
        setErrorMessage('Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <div className='mt-8 p-4'>
      <h1 className='bg-gray-700 mx-auto mb-10 max-w-screen-md mt-3 px-2 py-2 rounded-md font-bold text-2xl'>
        Signin user
      </h1>
      <form className="bg-gray-800 max-w-screen-md mx-auto py-2 rounded-md">
        <input
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="text"
          value={email}
          className="bg-gray-800 text-center mx-auto my-5 block border border-white-200 rounded-md"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          value={password}
          className="bg-gray-800 mx-auto text-center my-5 block border border-white-200 rounded-md"
        />
        <div className="mx-auto text-center">
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button
            disabled={!email || !password}
            onClick={handleSignin}
            className="my-2 ml-2 px-3 p-1 border rounded-md border-gray-200 hover:text-blue-500 hover:border-blue-500 transition-colors duration-300">
            Signin
          </button>
          <button
            onClick={handleCancel}
            className="my-2 ml-2 px-3 p-1 border rounded-md border-gray-200 hover:text-blue-500 hover:border-blue-500 transition-colors duration-300">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}