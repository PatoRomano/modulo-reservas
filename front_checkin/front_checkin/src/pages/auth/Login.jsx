import React from 'react';
import { AuthProvider } from '../../contexts/AuthContext';
import LoginForm from '../../components/LoginForm';

const Login = () => {
  return (
    <AuthProvider>
      <LoginForm />
      {/* Otros componentes */}
    </AuthProvider>
  );
};

export default Login;