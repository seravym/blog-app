'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

type Comment = {
  id: number;
  author: string;
  content: string;
  createdAt: string;
};

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  comments: Comment[];
};

export default function PostDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadPost = useCallback(async () => {
    const res = await fetch(`/api/posts/${id}`);
    if (res.status === 404) router.push('/not-found');
    else setPost(await res.json());
  }, [id, router]);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/posts/${id}`, { signal: controller.signal })
      .then(async (res) => {
        if (res.status === 404) router.push('/not-found');
        else setPost(await res.json());
      })
      .catch(() => {
        
      });

    return () => controller.abort();
  }, [id, router]);

  const handleDelete = async () => {
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    router.push('/');
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await fetch(`/api/posts/${id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author, content }),
    });
    setAuthor('');
    setContent('');
    await loadPost();
    setSubmitting(false);
  };

  if (!post) return <p className="container mt-4">Loading...</p>;

  return (
    <main className="container mt-4">
      <h1>{post.title}</h1>
      <p className="text-muted">{new Date(post.createdAt).toLocaleDateString('id-ID')}</p>
      <p>{post.content}</p>
      <button onClick={handleDelete} className="btn btn-danger mb-4">
        Delete
      </button>

      <h2>Comments ({post.comments.length})</h2>

      <form onSubmit={handleComment} className="card card-body mb-4">
        <div className="mb-2">
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name"
            className="form-control"
            required
          />
        </div>
        <div className="mb-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
            className="form-control"
            rows={2}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Posting...' : 'Post Comment'}
        </button>
      </form>

      {post.comments.length === 0 ? (
        <p className="text-muted">No comments yet.</p>
      ) : (
        <ul className="list-group mb-4">
          {post.comments.map((comment) => (
            <li key={comment.id} className="list-group-item">
              <strong>{comment.author}</strong>
              <span className="text-muted float-end">
                {new Date(comment.createdAt).toLocaleString('id-ID')}
              </span>
              <p className="mb-0">{comment.content}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
