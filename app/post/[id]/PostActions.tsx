'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PostActions({ postId }: { postId: number }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Hapus tulisan ini? Tindakan ini tidak bisa dibatalkan.')) return;

    setDeleting(true);
    const res = await fetch(`/api/posts/${postId}`, { method: 'DELETE' });

    if (!res.ok) {
      setDeleting(false);
      window.alert('Gagal menghapus tulisan.');
      return;
    }

    router.push('/');
    router.refresh();
  };

  return (
    <div className="article-actions">
      <button
        type="button"
        onClick={handleDelete}
        className="btn btn--danger btn--small"
        disabled={deleting}
      >
        {deleting ? 'Menghapus…' : 'Delete post'}
      </button>
    </div>
  );
}
