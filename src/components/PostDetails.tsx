"use client";
import { useRouter } from "next/navigation";
import { PostProps } from "./Post";
import styles from "../styles/Post.module.css";

export default function PostDetails({
  title,
  author,
  content,
  published,
  id,
}: PostProps) {
  const router = useRouter();

  async function publish(id: number) {
    await fetch(`/api/publish/${id}`, {
      method: "PUT",
    });
    router.refresh();
    router.push("/");
  }

  async function destroy(id: number) {
    await fetch(`/api/post/${id}`, {
      method: "DELETE",
    });
    router.refresh();
    router.push("/");
  }

  if (!published) {
    title = `${title} (Draft)`;
  }

  return (
    <div>
      <h2 className={styles.title}>{title} </h2>
      {/* @ts-ignore */}
      <p>{content}</p>
      <p className={styles.authorName}>Write by {author?.name}</p>

      {!published && (
        <button className={styles.button} onClick={() => publish(id)}>
          Publish
        </button>
      )}
      <button className={styles.button} onClick={() => destroy(id)}>
        Delete
      </button>
    </div>
  );
}
