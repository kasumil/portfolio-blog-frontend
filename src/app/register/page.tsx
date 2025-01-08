'use client';

import React from 'react';
import AuthPlate from '@/layouts/AuthPlate';
import RegisterForm from '@/components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <AuthPlate>
      <RegisterForm />
    </AuthPlate>
  );
};

export default RegisterPage;
