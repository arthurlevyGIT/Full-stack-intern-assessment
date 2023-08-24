import { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "../middleware/authMiddleware";

const protectedHandler =async (req: NextApiRequest, res: NextApiResponse) => {
  // This handler is protected and can only be accessed by authenticated users
  console.log(`userId is ${req.user.id}`)
  return res.status(200).json({
    message: `Protected route accessed by user`
  });
};

export default authMiddleware(protectedHandler);