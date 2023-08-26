'use client'
import React, { useEffect, useState } from 'react'
import Post from '../../components/Post'

export default function Drafts() {
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = localStorage.getItem('userData');
        if (!userData) {
          return;
        }
        const accessToken = (JSON.parse(userData)).accessToken;
        const response = await fetch(`/api/drafts`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        if (response.status === 200) {
          const drafts = await response.json();
          setDrafts(drafts);
        }

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <h1>Drafts</h1>
        <main>
          {drafts.map((post) => (
            <div key={post.id} >
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
    </>
  )
}
