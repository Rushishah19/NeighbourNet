import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { LogOut, User } from 'lucide-react';

export function Header() {
  const { currentUser, setCurrentUser } = useStore();

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-black-600">
            NeighbourNet
          </Link>

          <nav className="flex items-center space-x-6">
            {currentUser ? (
              <>
                <div className="flex items-center space-x-2">
                  <User size={20} className="text-gray-600" />
                  <span className="text-gray-700">{currentUser.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-600 hover:text-gray-900">
                  <LogOut size={20} className="mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Sign Up
                </Link>
                <Link
                  to="/admin"
                  className="bg-cyan-100 text-black px-4 py-2 rounded-lg hover:bg-cyan-400 transition-colors">
                  Admin Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}