import React, { useState } from 'react';
import Login from './components/Login';
import DynamicForm from './components/Form/DynamicForm';
import { User, Form } from './types';
import { UserAtom } from './atoms/userAtom';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoginSuccess = async (userData: User, formData: Form) => {
    setUser(userData);
    setForm(formData);
    UserAtom.user = userData; 
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!user ? (
        <Login 
          onLoginSuccess={handleLoginSuccess} 
          setUser={setUser} 
        />
      ) : (
        <div className="container mx-auto py-8 px-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : error ? (
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
              <div className="text-center text-red-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-xl font-bold mt-2">Error</h2>
              </div>
              <p className="text-center mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Retry
              </button>
            </div>
          ) : form ? (
            <DynamicForm form={form} />
          ) : null}
        </div>
      )}
    </div>
  );
}

export default App;
