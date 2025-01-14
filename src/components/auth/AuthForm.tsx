import React, { useState } from 'react';
import Link from 'next/link';
import InputField from '@/components/common/InputField';
import Button from '@/components/common/Button';
import styled from 'styled-components';
import palette from '@/lib/styles/palette';

type Props = {
  type: 'login' | 'register';
  form: Object;
  onChange: React.ChangeEvent<HTMLInputElement>;
  onSubmit: React.FormEvent<HTMLFormElement>;
};

const textMap = {
  login: '로그인',
  register: '회원가입',
};

const AuthForm = ({ type, form, onChange, onSubmit }: Props) => {
  const Footer = styled.div`
    margin-top: 1rem;
    text-align: right;
    a {
      color: ${palette.gray[6]};
      text-decoration: underline;
      &:hover {
        font-weight: bold;
        color: ${palette.gray[9]};
      }
  `;

  const ButtonWidthMargintop = styled(Button)`
    margin-top: 1rem;
  `;

  const text = textMap[type];
  return (
    <>
      <form onSubmit={onSubmit}>
        <h3>{text}</h3>
        <InputField
          name="username"
          type="text"
          value={form.username}
          onChange={onChange}
          onSubmit={onSubmit}
          placeholder="User name"
        />
        <InputField
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          onSubmit={onSubmit}
          placeholder="Password"
        />
        {type === 'register' && (
          <InputField
            name="passwordConfirm"
            type="password"
            value={form.passwordConfirm}
            onChange={onChange}
            onSubmit={onSubmit}
            placeholder="Password Confirm"
          />
        )}
        <ButtonWidthMargintop cyan fullWidth type="submit">
          {text}
        </ButtonWidthMargintop>
      </form>
      <Footer>
        <Link href={type === 'login' ? '/register' : '/login'}>
          {type === 'login' ? 'Register' : 'Login'}
        </Link>
      </Footer>
    </>
  );
};

export default AuthForm;
