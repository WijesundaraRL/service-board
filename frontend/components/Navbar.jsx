'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight hover:opacity-80">
          🔧 Service Board
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm opacity-80">Hi, {user.username}</span>
              <Link
                href="/jobs/new"
                className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition text-sm"
              >
                + Post a Job
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm border border-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm border border-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition text-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;