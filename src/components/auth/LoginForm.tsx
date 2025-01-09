'use client';

import React, { useEffect, useState } from 'react';
import AuthForm from './AuthForm';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, loginFailure } from '@/store/module/auth';
import { createSelector } from 'reselect';
import { useGetCheckMutation, usePostLoginMutation } from '@/lib/api/client';
import { useRouter } from 'next/navigation';
import { checkFailure, checkSuccess } from '@/store/module/user';

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [login, { isLoading: loginLoading, error: loginError }] =
    usePostLoginMutation();
  const [
    loginCheck,
    { data: check, error: checkError, isLoading: checkIsLoading },
  ] = useGetCheckMutation();
  const selectAuthAndUser = createSelector(
    (state: Object) => state.auth,
    (state: Object) => state.user,
    (auth, user) => ({
      form: auth.login,
      user: user.user,
    }),
  );

  const { form, user } = useSelector(selectAuthAndUser);
  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement login action
    const { username, password } = form;

    try {
      const response = await login({ username, password }).unwrap();
      if (response) {
        document.cookie = `access_token=${response.token}`;
        dispatch(checkSuccess(response));
      } else {
        dispatch(checkFailure(response));
      }
    } catch (err) {
      dispatch(loginFailure({ status: err.status, message: err.data }));
      setError(err.data);
    }
  };

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (checkError) {
      console.log('로그인 실패');
      console.log(checkError);
      return;
    }
    if (check) {
      console.log('로그인 성공');
      console.log(check);
      loginCheck();
    }
  }, [check, checkError]);

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [router, user]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default LoginForm;
