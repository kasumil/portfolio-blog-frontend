'use client';

import React from 'react';
import AuthPlate from '@/components/auth/AuthPlate';
import RegisterForm from '@/containers/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <AuthPlate>
      <RegisterForm />
    </AuthPlate>
  );
};

export default RegisterPage;
