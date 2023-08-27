'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '../context/authContext';
import Signout from '../components/Signout'

export default function Header() {
  const routePathName = usePathname()
  const isActive: (pathname: string) => boolean = (pathname) =>
    routePathName === pathname

  const { authenticated } = useAuth();

  const [userName, setUsername] = useState(null);
  useEffect(() => {
    const data = localStorage.getItem('userData');
    if (data)
      setUsername(authenticated && data ? JSON.parse(data).name : null)
  }, []);

  return (
    <nav className='bg-gray-900 fixed top-0 left-0 right-0 border-b border-gray-700 flex justify-between items-center py-3 px-4 '>
      {/* fp-4 text-white */}
      <div>
        <Link href="/" legacyBehavior>
          <a data-active={isActive('/')} className='hover:text-blue-500 transition-colors duration-300'>
            Home
          </a>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <a className='text-purple-300 font-extrabold'>{userName}</a>
        {/* Render Drafts links if authenticated */}
        {authenticated && (
          <Link href="/drafts" legacyBehavior>
            <a data-active={isActive('/drafts')} className='hover:text-blue-500 transition-colors duration-300'>Drafts</a>
          </Link>
        )}
        {/* Render Signup and Signin links if not authenticated */}
        {!authenticated && (
          <>
            <Link href="/signup" legacyBehavior>
              <a data-active={isActive('/signup')} className='hover:text-blue-500 transition-colors duration-300'>Signup</a>
            </Link>
            <Link href="/signin" legacyBehavior>
              <a data-active={isActive('/signin')} className='hover:text-blue-500 transition-colors duration-300'>Signin</a>
            </Link>
          </>
        )}
        {/* Render Create draft link if authenticated */}
        {authenticated && (
          <>
            <Link href="/create" legacyBehavior>
              <a data-active={isActive('/create')} className='hover:text-blue-500 transition-colors duration-300'>Create draft</a>
            </Link>
            <Signout />
          </>
        )}
      </div>
    </nav>
  );
}
