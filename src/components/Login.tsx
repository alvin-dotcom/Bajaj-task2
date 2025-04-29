import React, { useState } from 'react';
import { User } from '../types';
import { loginUser, registerUser } from '../services/api';
import { getForm } from '../services/api';


interface LoginProps {
  onLoginSuccess: (user: User, formData: any) => void; 
  setUser: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<User>({
    rollNumber: '',
    name: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
    setSuccessMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (!formData.rollNumber.trim()) {
        throw new Error('Roll Number is required');
      }
      if (!formData.name.trim()) {
        throw new Error('Name is required');
      }



      if (isLogin) {
        const formResponse = await getForm(formData.rollNumber);
        setSuccessMessage('Login successful!');
        setUser(formData);
        setTimeout(() => {
          onLoginSuccess(formData, formResponse.form); 
        }, 1500);
      } 
      else {
        const response = await registerUser(formData);
        if (response.success) {
          setSuccessMessage('Registration successful!');
          
          setTimeout(() => {
            setIsLogin(true); 
            setFormData({ rollNumber: '', name: '' });
            setSuccessMessage(null); 
          }, 3000);
        } else {
          setError(response.message);
        }
      }
      
    
    } catch (err) {
      console.error('Unexpected error:', err);
      setError(err instanceof Error ? err.message : `An error occurred during ${isLogin ? 'login' : 'registration'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Student {isLogin ? 'Login' : 'Registration'}
          </h1>
          <p className="mt-2 text-gray-600">
            {isLogin ? 'Login to access the form' : 'Register to create an account'}
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              isLogin
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Login
          </button>

          <button
             onClick={() => setIsLogin(false)}
             className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
               !isLogin
                 ? 'bg-indigo-600 text-white'
                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
             }`}
           >
             Register
           </button>
          
        </div>

        {error && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700">
              Roll Number
            </label>
            <input
              id="rollNumber"
              name="rollNumber"
              type="text"
              required
              value={formData.rollNumber}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your roll number"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading
  ? 'Please wait...'
  : successMessage && !isLogin
    ? 'Registered successfully!'
    : isLogin
      ? 'Login'
      : 'Register'}

            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
