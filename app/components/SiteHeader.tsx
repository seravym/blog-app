import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand">
          Blog<span>.</span>
        </Link>

        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/#posts">Posts</Link>
        </nav>

        <div className="header-actions">
          <Link href="/create" className="btn btn--accent btn--small">
            New post
          </Link>
        </div>
      </div>
    </header>
  );
}
