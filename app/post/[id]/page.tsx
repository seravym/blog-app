import { Suspense } from 'react';
import PostDetail from './PostDetail';

export default function PostPage() {
  return (
    <Suspense fallback={<p className="container mt-4">Loading...</p>}>
      <PostDetail />
    </Suspense>
  );
}
