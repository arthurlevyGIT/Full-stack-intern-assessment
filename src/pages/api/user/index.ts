import type { NextApiRequest, NextApiResponse } from 'next'
import validator from 'validator'
import prisma from '../../../lib/prisma'


// POST /api/user
// Required fields in body: name, email
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== 'POST')
        return res.status(405).json({ error: 'Method Not Allowed' });

    const { email, name } = req.body;

    // Check for the required body fields
    const validationError = validateBodyFields(email, name);
    if (validationError)
        return res.status(400).json({ error: validationError });

    return post(req, res);
}

function validateBodyFields(email: unknown, name: unknown) {
    if (!email)
        return 'email is required.';

    if (!validator.isEmail(email))
        return 'Invalid email format.';

    if (!name)
        return 'name is required.';

    return null;
}

async function post(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const result = await prisma.user.create({
        data: {
            ...req.body,
        },
    })
    return res.status(201).json(result)
}
