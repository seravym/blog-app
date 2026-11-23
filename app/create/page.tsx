'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    if (!res.ok) {
      setError('Gagal menyimpan tulisan. Coba lagi.');
      setSubmitting(false);
      return;
    }

    router.push('/');
    router.refresh();
  };

  return (
    <main className="page-shell">
      <div className="form-page">
        <p className="hero__eyebrow">Tulis</p>
        <h1 className="form-page__title">Tulisan baru</h1>

        <form onSubmit={handleSubmit} className="panel">
          <div className="field">
            <label className="label" htmlFor="title">
              Judul
            </label>
            <input
              id="title"
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Judul tulisan"
              required
            />
          </div>

          <div className="field">
            <label className="label" htmlFor="content">
              Isi
            </label>
            <textarea
              id="content"
              className="textarea"
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tulis di sini…"
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <div className="form-actions">
            <button type="submit" className="btn btn--accent" disabled={submitting}>
              {submitting ? 'Menyimpan…' : 'Publish'}
            </button>
            <Link href="/" className="btn btn--ghost">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
