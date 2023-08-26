import prisma from "../lib/prisma"
import Post from "../components/Post"

export default async function Home() {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
      comments: {
        include: {
          author: { select: { name: true, } }
        }
      },
    },
  });

  const reversedFeed = feed.reverse();

  return (
    <div className="mt-8 p-4">

      <h1 className='bg-gray-700 mx-auto max-w-screen-md mt-3 px-2 py-2 rounded-md font-bold text-2xl'>
        The blog
      </h1>
      {reversedFeed.map((post) => (
        <div key={post.id}>
          <Post post={post} />
        </div>
      ))}
    </div>
  )
}
