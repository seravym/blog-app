import Image from 'next/image';
import Link from 'next/link';
import { desc } from 'drizzle-orm';
import { db } from '@/db';
import { posts } from '@/db/schema';
import { excerpt, formatDate, readingTime } from '@/lib/format';
import { postImage } from '@/lib/post-image';

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

function PostCard({ post, priority = false }: { post: Post; priority?: boolean }) {
  return (
    <Link href={`/post/${post.id}`} className="post-card">
      <div className="post-card__media">
        <Image
          src={postImage(post.id)}
          alt={post.title}
          fill
          priority={priority}
          sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 380px"
          className="post-card__img"
        />
      </div>
      <div className="post-card__body">
        <div className="post-card__top">
          <span className="chip">Catatan</span>
          <span className="post-card__read">{readingTime(post.content)} min read</span>
        </div>
        <h3 className="post-card__title">{post.title}</h3>
        <p className="post-card__excerpt">{excerpt(post.content)}</p>
        <div className="post-card__meta">
          <span>{formatDate(post.createdAt)}</span>
          <span className="post-card__more">Read more →</span>
        </div>
      </div>
    </Link>
  );
}

export default async function Home() {
  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));

  return (
    <main>
      <section className="hero page-shell">
        <p className="hero__eyebrow">Blog · Journal</p>
        <h1 className="hero__title">The Blog</h1>
        <p className="hero__sub">
          Catatan, cerita, dan ide tentang pekerjaan, hidup, dan segala hal di antaranya.
        </p>
      </section>

      <section id="posts" className="page-shell">
        {allPosts.length === 0 ? (
          <p className="page-loading">
            Belum ada tulisan. <Link href="/create" className="post-card__more">Buat post pertama →</Link>
          </p>
        ) : (
          <div className="post-grid">
            {allPosts.map((post, index) => (
              <PostCard key={post.id} post={post} priority={index < 3} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
