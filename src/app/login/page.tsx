'use client';

import React from 'react';
import AuthPlate from '@/components/auth/AuthPlate';
import LoginForm from '@/containers/auth/LoginForm';

const LoginPage = () => {
  return (
    <AuthPlate>
      <LoginForm />
    </AuthPlate>
  );
};

export default LoginPage;
