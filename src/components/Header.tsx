'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '../context/authContext';
import  Signout  from '../components/Signout'
import styles from './Header.module.css'

export default function Header() {
  const routePathName = usePathname()
  const isActive: (pathname: string) => boolean = (pathname) =>
    routePathName === pathname

  const { authenticated } = useAuth();
  const userData = localStorage.getItem('userData');
  const userName = authenticated && userData ? JSON.parse(userData).name : null;

  // TODO: Put this below in a css file
  const inlineStyle = {
    display: 'inline',
    marginRight: '10px',
  };

  return (
    <nav>
      <div className={styles.left}>
        <Link href="/" legacyBehavior>
          <a className={styles.bold} data-active={isActive('/')}>
            Blog
          </a>
        </Link>
        {/* Render Drafts links if authenticated */}
        {authenticated && (
          <Link href="/drafts" legacyBehavior>
            <a data-active={isActive('/drafts')}>Drafts</a>
          </Link>
        )}
      </div>
      <div className={styles.right}>
        {/* Render Signup and Signin links if not authenticated */}
        {!authenticated && (
          <>
            <Link href="/signup" legacyBehavior>
              <a data-active={isActive('/signup')}>Signup</a>
            </Link>
            <Link href="/signin" legacyBehavior>
              <a data-active={isActive('/signin')}>Signin</a>
            </Link>
          </>
        )}
        {/* Render Create draft link if authenticated */}
        {authenticated && (
          <>
            <p style={inlineStyle}>{userName}</p>
            <Link href="/create" legacyBehavior>
              <a data-active={isActive('/create')}>+ Create draft</a>
            </Link>
            <Signout/>
          </>
        )}
      </div>
    </nav>
  );
}
