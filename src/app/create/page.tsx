'use client'
import EditPost from "../../components/EditPost"

export default function Draft() {
  return (
    <div className="mt-8 p-4">
      <h1 className='bg-gray-700 mx-auto mb-10 max-w-screen-md mt-3 px-2 py-2 rounded-md font-bold text-2xl'>
        Create a post
      </h1>
      <EditPost mainTitle="Create a post" post={null} />
    </div>
  )
}
