const API_BASE_URL = 'http://localhost:5173/api' ;

export const signupUser = async (userData: {
  email: string;
  name: string;
  phone: string;
  password: string;
  type: 'worker' | 'customer';
}) => {
  try {
    console.log('Sending signup request:', { ...userData, password: '[REDACTED]' });
    
    const response = await fetch(`${API_BASE_URL}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Signup failed:', data);
      throw new Error(data.message || 'Signup failed');
    }

    console.log('Signup successful:', { ...data, user: { ...data.user, password: '[REDACTED]' } });
    return data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
  
};
console.log(signupUser);