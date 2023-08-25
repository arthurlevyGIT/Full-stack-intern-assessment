'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '../context/authContext';
import styles from './Header.module.css'

export default function Header() {
  const routePathName = usePathname()
  const isActive: (pathname: string) => boolean = (pathname) =>
    routePathName === pathname

  const { authenticated } = useAuth();

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
          <Link href="/create" legacyBehavior>
            <a data-active={isActive('/create')}>+ Create draft</a>
          </Link>
        )}
      </div>
    </nav>
  );
}
