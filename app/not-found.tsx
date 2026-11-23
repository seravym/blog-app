import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="notfound">
      <h1>404</h1>
      <p>Tulisan atau halaman yang kamu cari tidak ada.</p>
      <Link href="/" className="btn btn--accent">
        Kembali ke beranda
      </Link>
    </main>
  );
}
