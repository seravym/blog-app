'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type CommentView = {
  id: number;
  author: string;
  content: string;
  createdAt: string;
};

export default function CommentSection({
  postId,
  comments,
}: {
  postId: number;
  comments: CommentView[];
}) {
  const router = useRouter();
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    const res = await fetch(`/api/posts/${postId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author, content }),
    });

    if (!res.ok) {
      setError('Komentar gagal dikirim. Coba lagi.');
      setSubmitting(false);
      return;
    }

    setAuthor('');
    setContent('');
    setSubmitting(false);
    router.refresh();
  };

  return (
    <section className="comments">
      <h2 className="comments__title">
        Comments <span className="comments__count">({comments.length})</span>
      </h2>

      <form onSubmit={handleSubmit} className="comment-form">
        <div className="field">
          <label className="label" htmlFor="comment-author">
            Nama
          </label>
          <input
            id="comment-author"
            className="input"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            placeholder="Nama kamu"
            required
          />
        </div>
        <div className="field">
          <label className="label" htmlFor="comment-content">
            Komentar
          </label>
          <textarea
            id="comment-content"
            className="textarea"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Tulis komentar…"
            rows={3}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div>
          <button type="submit" className="btn btn--accent btn--small" disabled={submitting}>
            {submitting ? 'Mengirim…' : 'Post comment'}
          </button>
        </div>
      </form>

      {comments.length === 0 ? (
        <p className="empty">Belum ada komentar. Jadi yang pertama!</p>
      ) : (
        comments.map((comment) => (
          <article key={comment.id} className="comment">
            <div className="comment__head">
              <span className="comment__author">{comment.author}</span>
              <span className="comment__time">{comment.createdAt}</span>
            </div>
            <p className="comment__content">{comment.content}</p>
          </article>
        ))
      )}
    </section>
  );
}
