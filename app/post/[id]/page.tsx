import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { asc, eq } from 'drizzle-orm';
import { db } from '@/db';
import { comments, posts } from '@/db/schema';
import {
  formatDate,
  formatDateTime,
  paragraphs,
  readingTime,
} from '@/lib/format';
import { postImage } from '@/lib/post-image';
import PostActions from './PostActions';
import CommentSection from './CommentSection';

type PostPageProps = {
  params: Promise<{ id: string }>;
};

export default function PostPage({ params }: PostPageProps) {
  return (
    <Suspense fallback={<p className="page-loading">Memuat tulisan…</p>}>
      <PostContent params={params} />
    </Suspense>
  );
}

async function PostContent({ params }: PostPageProps) {
  const { id } = await params;
  const postId = Number(id);

  if (!Number.isInteger(postId)) notFound();

  const post = await db.select().from(posts).where(eq(posts.id, postId)).get();

  if (!post) notFound();

  const postComments = await db
    .select()
    .from(comments)
    .where(eq(comments.postId, post.id))
    .orderBy(asc(comments.createdAt));

  return (
    <main className="page-shell post-page">
      <Link href="/" className="back-link">
        ← Semua tulisan
      </Link>

      <header className="article-header">
        <span className="chip">Catatan</span>
        <h1 className="article-title">{post.title}</h1>
        <div className="article-meta">
          <span>{formatDate(post.createdAt)}</span>
          <span className="dot" />
          <span>{readingTime(post.content)} min read</span>
        </div>
      </header>

      <div className="article-media">
        <Image
          src={postImage(post.id)}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 1000px) 100vw, 980px"
          className="article-img"
        />
      </div>

      <div className="article-body">
        {paragraphs(post.content).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <PostActions postId={post.id} />

      <CommentSection
        postId={post.id}
        comments={postComments.map((comment) => ({
          id: comment.id,
          author: comment.author,
          content: comment.content,
          createdAt: formatDateTime(comment.createdAt),
        }))}
      />
    </main>
  );
}
