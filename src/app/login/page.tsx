'use client';

import React from 'react';
import AuthPlate from '@/layouts/AuthPlate';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage = () => {
  return (
    <AuthPlate>
      <LoginForm />
    </AuthPlate>
  );
};

export default LoginPage;
