import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from '../../../lib/prisma'

// In production we should load it from the environment
export const JWT_SECRET = 'mysecret=)';

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST")
        return res.status(405).json({ message: "Method Not Allowed" });

    const { email, password } = req.body;

    // In production we must use hashed password for security reasons
    const user = await prisma.user.findFirst({
        where: { email: email }
    });

    if (!(user && user.email === email && user.password === password))
        return res.status(401).json({ message: 'Unauthorized' });

    const accessToken = jwt.sign(
        { email: user.email, id: user.id },
        JWT_SECRET!
    );

    const userData = { name: user.name, id: user.id, accessToken }
    return res.status(200).json(userData);
}
