'use client'
import React, { useEffect, useState } from 'react'
import { notFound, } from 'next/navigation'
import PostDetails from '../../../components/PostDetails'

export default function Post({ params }: { params: { id: string } }) {
  const [post, setPost] = useState([]);
  const id = Number(
    Array.isArray(params?.id)
      ? params?.id[0]
      : params?.id,
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = localStorage.getItem('userData');
        if (!userData) {
          return;
        }
        const response = await fetch(`/api/post/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.status === 200) {
          const post = await response.json();
          setPost(post);
        }

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (!post) notFound()

  return (
    <PostDetails {...post} />
  )
}
