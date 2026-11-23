import { db } from '@/db';
import { comments, posts } from '@/db/schema';
import { asc, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const post = await db.select().from(posts).where(eq(posts.id, Number(id))).get();
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  const postComments = await db
    .select()
    .from(comments)
    .where(eq(comments.postId, post.id))
    .orderBy(asc(comments.createdAt));

  return NextResponse.json({ ...post, comments: postComments });
}
