import { db } from '@/db';
import { comments, posts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const post = await db.select().from(posts).where(eq(posts.id, Number(id))).get();
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  const { author, content } = await req.json();

  if (!author || !content) {
    return NextResponse.json({ error: 'Author and content are required' }, { status: 400 });
  }

  const newComment = await db
    .insert(comments)
    .values({ postId: post.id, author, content })
    .returning();

  return NextResponse.json(newComment[0], { status: 201 });
}
