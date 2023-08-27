'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { name, email, password }
      await fetch(`/api/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <div className='mt-8 p-4'>
      <h1 className='bg-gray-700 mx-auto mb-10 max-w-screen-md mt-3 px-2 py-2 rounded-md font-bold text-2xl'>
        Signup user
      </h1>
      <form className="bg-gray-800 max-w-screen-md mx-auto py-2 rounded-md">
        <input
          autoFocus
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          type="text"
          value={name}
          className="bg-gray-800 text-center mx-auto my-5 block border border-white-200 rounded-md"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          type="text"
          value={email}
          className="bg-gray-800 text-center mx-auto my-5 block border border-white-200 rounded-md"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          value={password}
          className="bg-gray-800 text-center mx-auto my-5 block border border-white-200 rounded-md"
        />
        <div className="mx-auto text-center">
          <button
            disabled={!email || !password}
            onClick={handleSignup}
            className="my-2 ml-2 px-3 p-1 border rounded-md border-gray-200 hover:text-blue-500 hover:border-blue-500 transition-colors duration-300">
            Signup
          </button>
          <button
            onClick={handleCancel}
            className="my-2 ml-2 px-3 p-1 border rounded-md border-gray-200 hover:text-blue-500 hover:border-blue-500 transition-colors duration-300">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
