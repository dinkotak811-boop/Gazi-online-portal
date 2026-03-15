import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="glass rounded-2xl p-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">404</h2>
        <p className="text-white/60 mb-6">Page not found</p>
        <Link
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-semibold"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
