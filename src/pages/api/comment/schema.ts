import { z } from "zod";

const schema = z.object({
  content: z.string().min(3).max(255),
  authorEmail: z.string().email(),
  postId: z.number(),
});

export default schema;
