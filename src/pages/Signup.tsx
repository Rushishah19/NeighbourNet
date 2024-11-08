import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';

export function Signup() {
  const [userType, setUserType] = useState<'worker' | 'customer'>('customer');
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
  });

  const API_BASE_URL = 'http://localhost:5173/api';

  const navigate = useNavigate();
  const { addUser } = useStore();

  const handlePasswordChange = (password: string) => {
    setFormData({ ...formData, password });

    setPasswordValidations({
      minLength: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      specialChar: /[^A-Za-z0-9]/.test(password),
    });
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError('');
  //   setIsLoading(true);
  
  //   try {
  //     if (formData.password !== formData.confirmPassword) {
  //       setError('Passwords do not match');
  //       setIsLoading(false);
  //       return;
  //     }
  
  //     if (!Object.values(passwordValidations).every(Boolean)) {
  //       setError('Please meet all password requirements');
  //       setIsLoading(false);
  //       return;
  //     }
  
  //     const userData = {
  //       email: formData.email,
  //       name: formData.name,
  //       phone: formData.phone,
  //       password: formData.password,
  //       type: userType,
  //     };
  
  //     const response = await fetch(`${API_BASE_URL}/signup`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(userData),
  //     });
  
  //     // Ensure the response is valid JSON
  //     const textData = await response.text();
  //     const data = textData ? JSON.parse(textData) : null;
  
  //     if (response.ok && data) {
  //       addUser({
  //         id: data.user.id,
  //         email: data.user.email,
  //         name: data.user.name,
  //         phone: data.user.phone,
  //         type: data.user.type,
  //       });
  //       navigate('/login');
  //     } else {
  //       setError(data?.message || 'Failed to create account');
  //     }
  //   } catch (err: any) {
  //     setError(err.message || 'Error occurred during signup');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
  
    try {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
      }
  
      if (!Object.values(passwordValidations).every(Boolean)) {
        setError('Please meet all password requirements');
        setIsLoading(false);
        return;
      }
  
      const userData = {
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        password: formData.password,
        type: userType,
      };
  
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      const textData = await response.text();
      console.log('Response Status:', response.status);
      console.log('Response Body:', textData);
  
      const data = textData ? JSON.parse(textData) : null;
  
      if (response.ok && data) {
        addUser({
          id: data.user._id,  // Use `_id` if that’s MongoDB’s unique ID field
          email: data.user.email,
          name: data.user.name,
          phone: data.user.phone,
          type: data.user.type,
        });
        navigate('/login');
      } else {
        setError(data?.message || 'Failed to create account');
      }
    } catch (err: any) {
      console.error('Error during signup:', err);
      setError(err.message || 'Error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <div className="flex justify-center space-x-4 mb-6">
          <button
            type="button"
            className={`px-4 py-2 rounded-lg ${
              userType === 'customer' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setUserType('customer')}
          >
            Customer
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-lg ${
              userType === 'worker' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'
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
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.password}
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
            <div className="mt-2 text-sm text-gray-600">
              <p className={passwordValidations.minLength ? 'text-green-600' : ''}>✔️ 8+ characters</p>
              <p className={passwordValidations.uppercase ? 'text-green-600' : ''}>✔️ Uppercase letter</p>
              <p className={passwordValidations.lowercase ? 'text-green-600' : ''}>✔️ Lowercase letter</p>
              <p className={passwordValidations.specialChar ? 'text-green-600' : ''}>✔️ Special symbol (e.g., !@#$)</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}
