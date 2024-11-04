import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../store';
 import '../components/AnimatedBackground.css';



export function Login() {
  const [userType, setUserType] = useState<'worker' | 'customer'>('customer');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setCurrentUser, users } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = users.find(
      (u) => u.email === email && u.type === userType
    );

    if (!user) {
      setError('Invalid email or user type');
      return;
    }

    setCurrentUser(user);
    navigate(`/${userType}-dashboard`);
  };

  return (
   // <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
    // <AnimatedBackground/>
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <div className="flex justify-center space-x-4 mb-6">
            <button
              className={`px-4 py-2 rounded-lg ${
                userType === 'customer'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setUserType('customer')}
            >
              Customer
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                userType === 'worker'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setUserType('worker')}
            >
              Worker
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-red-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              Login
            </button>

            <p className="text-center text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    //</div>
  );
}

// AnimatedBackground.tsx

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="lines-container">
        {[...Array(20)].map((_, index) => (
          <div key={index} className="animated-line"></div>
        ))}
      </div>
    </div>
  );
}
