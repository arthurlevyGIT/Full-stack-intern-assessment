import prisma from "../lib/prisma";
import Post from "../components/Post";
import styles from "./page.module.css";

export default async function Home() {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  });
  return (
    <>
      <h1 className={styles.title}>LAZO BLOG</h1>
      <div className={styles.containerForAllArticles}>
        {feed.map((post) => (
          <div key={post.id}>
            <Post post={post} />
          </div>
        ))}
      </div>
    </>
  );
}
