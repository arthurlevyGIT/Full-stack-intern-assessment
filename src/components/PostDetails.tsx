"use client";
import { useRouter } from "next/navigation";
import { PostProps } from "./Post";
import styles from "../styles/Post.module.css";
import ReactMarkdown from "react-markdown";

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
    router.push("/");
  }

  async function destroy(id: number) {
    await fetch(`/api/post/${id}`, {
      method: "DELETE",
    });
    router.push("/");
  }

  if (!published) {
    title = `${title} (Draft)`;
  }

  return (
    <div>
      <h2>{title}</h2>
      <p>By {author?.name || "Unknown author"}</p>
      {/* @ts-ignore */}
      <ReactMarkdown>{content}</ReactMarkdown>
      {!published && (
        <button className={styles.button} onClick={() => publish(id)}>
          Publish
        </button>
      )}
      <button className={styles.button} onClick={() => destroy(id)}>
        Delete
      </button>
      {/* FORM comment section */}
      <div className={styles.commentContainer}>
        <div className={styles.commentSection}>
          <p className="CounterComments">11 comments</p>
          <p>Name</p>
          <p>
            Example : Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Sequi neque harum soluta! Temporibus exercitationem cumque porro
            mollitia. Odio ipsa provident nihil voluptas fugit et dicta, a
            maiores, debitis omnis, incidunt rem adipisci sapiente? Blanditiis
            nam mollitia incidunt ex itaque saepe ullam voluptatibus, velit
            fugit recusandae, accusamus, id reiciendis reprehenderit rerum.
          </p>
        </div>
        <h3>Post a comment</h3>
        <form className={styles.formCommentContainer}>
          <input
            type="text"
            name="author"
            placeholder="Name"
            className={styles.commentFormName}
          />
          <textarea
            className={styles.commentFormComment}
            placeholder="Comment"
          />
          <button>Post a comment</button>
        </form>
      </div>
    </div>
  );
}
