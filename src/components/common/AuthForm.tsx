import React, { useState } from 'react';
import Link from 'next/link';
import InputField from '@/components/common/InputField';
import Button from '@/components/common/Button';
import styled from 'styled-components';
import palette from '@/lib/styles/palette';

type Props = {
  type: 'login' | 'register';
};

const textMap = {
  login: '로그인',
  register: '회원가입',
};

const AuthForm = ({ type, form, onChnage, onSubmit }: Props) => {
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
      <form onSubmit={handleSubmit}>
        <h3>{text}</h3>
        <InputField
          name="usernmae"
          type="text"
          value={form.usernmae}
          onChange={onChnage}
          onSubmit={onSubmit}
          placeholder="User name"
        />
        <InputField
          name="password"
          type="password"
          value={form.password}
          onChange={onChnage}
          onSubmit={onSubmit}
          placeholder="Password"
        />
        {type === 'register' && (
          <InputField
            name="passwordConfirm"
            type="password"
            value={form.passwordConfirm}
            onChange={onChnage}
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
