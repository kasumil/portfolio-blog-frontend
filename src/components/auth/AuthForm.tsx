import React, { useState } from 'react';
import Link from 'next/link';
import InputField from '@/components/common/InputField';
import Button from '@/components/common/Button';
import styled from 'styled-components';
import palette from '@/lib/styles/palette';

type Props = {
  type: 'login' | 'register';
  form: { username: string; password: string; passwordConfirm: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const textMap = {
  login: '로그인',
  register: '회원가입',
};

const ButtonWidthMarginTop = styled(Button)`
  margin-top: 1rem;
`;

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

const AuthForm = ({ type, form, onChange, onSubmit }: Props) => {
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
          placeholder="아이디"
        />
        <InputField
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          placeholder="비밀번호"
        />
        {type === 'register' && (
          <InputField
            name="passwordConfirm"
            type="password"
            value={form.passwordConfirm}
            onChange={onChange}
            placeholder="비밀번호 확인"
          />
        )}
        <ButtonWidthMarginTop cyan={true} fullWidth={true} type="submit">
          {text}
        </ButtonWidthMarginTop>
      </form>
      <Footer>
        {type === 'login' ? (
          <Link href={'/register'}>회원가입</Link>
        ) : (
          <Link href={'/login'}>로그인</Link>
        )}
      </Footer>
    </>
  );
};

export default AuthForm;
