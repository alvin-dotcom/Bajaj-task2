import { User, FormResponse } from '../types';

const API_BASE_URL = 'https://dynamic-form-generator-9rl7.onrender.com';

export async function loginUser(userData: User): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/get-form?rollNumber=${userData.rollNumber}`);
    
    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    return { success: true, message: 'Login successful' };
  } catch (error) {
    console.error('Error logging in:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
}

export async function registerUser(userData: User): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/create-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to register user');
    }

    return { success: true, message: data.message || 'User registered successfully' };
  } catch (error) {
    console.error('Error registering user:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
}

export async function getForm(rollNumber: string): Promise<FormResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/get-form?rollNumber=${rollNumber}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch form data');
    }

    const data: FormResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching form:', error);
    throw error;
  }
}