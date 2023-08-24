import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

// In production we should load it from the environment
export const JWT_SECRET = 'mysecret=)';

// Mock user data
const users = [
    { id: 1, username: "example", password: "password" },
];

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST")
        return res.status(405).json({ message: "Method Not Allowed" });

      const { username, password } = req.body;

      // In production we must use hashed password for security reasons
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (!user)
        return res.status(401).json({ message: 'Unauthorized' });

      const accessToken = jwt.sign(
        { username: user.username, id: user.id },
        JWT_SECRET!
      );

      return res.status(200).json({ accessToken });
}
