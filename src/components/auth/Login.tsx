import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle, Loader } from 'lucide-react';
import { createAuditLog } from '../../utils/hipaaCompliance';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // In a real application, you would make an API call here
      // For this example, we'll use a mock login
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      if (email === 'admin@carezen.com' && password === 'admin123') {
        const user = { id: '1', name: 'Admin User', role: 'admin' as const };
        login(user);
        createAuditLog(user.id, 'login', 'user_account');
        navigate('/admin');
      } else if (email === 'doctor@carezen.com' && password === 'doctor123') {
        const user = { id: '2', name: 'Dr. Smith', role: 'doctor' as const };
        login(user);
        createAuditLog(user.id, 'login', 'user_account');
        navigate('/doctor');
      } else if (email === 'patient@carezen.com' && password === 'patient123') {
        const user = { id: '3', name: 'John Doe', role: 'patient' as const };
        login(user);
        createAuditLog(user.id, 'login', 'user_account');
        navigate('/patient');
      } else if (email === 'family@carezen.com' && password === 'family123') {
        const user = { id: '4', name: 'Family Member', role: 'family' as const };
        login(user);
        createAuditLog(user.id, 'login', 'user_account');
        navigate('/family');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to CareZen
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="animate-spin h-5 w-5 mr-3" />
              ) : (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {/* LockClosedIcon */}
                </span>
              )}
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;