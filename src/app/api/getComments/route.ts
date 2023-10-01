import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

//READ ALL COMMENTS

export const GET = async () => {
  try {
    const comments = await prisma.comment.findMany();
    return NextResponse.json({ message: "Success", comments }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Error to read database", err },
      { status: 500 }
    );
  }
};
