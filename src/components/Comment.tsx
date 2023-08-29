'use client'
import React from "react";
import type { Comment } from "@prisma/client";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function Comment({ comment }: { comment: Comment	}) {
	
	return( <div>
		<ReactMarkdown>{comment.content}</ReactMarkdown>
	</div>);
}