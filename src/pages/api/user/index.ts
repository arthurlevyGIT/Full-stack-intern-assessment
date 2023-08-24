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

    const { email, name, password } = req.body;

    // Check for the required body fields
    const validationError = await validateBodyFields(email, name, password);
    if (validationError)
        return res.status(400).json({ error: validationError });

    return post(req, res);
}

async function validateBodyFields(email: string, name: string, password: string) {
    if (!email)
        return 'email is required.';

    if (!validator.isEmail(email))
        return 'Invalid email format.';

    if (!name)
        return 'name is required.';

    if (!password)
        return 'password is required.';

    if (await isNameTaken(name))
        return 'Name already taken';

    if (await isEmailTaken(email))
        return 'Email already taken';

    return null;
}

async function isNameTaken(name: string) {
    const user = await prisma.user.findFirst({
        where: {
            name: name
        }
    });

    return user !== null;
}

async function isEmailTaken(email: string) {
    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    });

    return user !== null;
}

async function post(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const result = await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        },
    })
    return res.status(201).json(result)
}
