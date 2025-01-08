import React, { useEffect } from 'react';
import AuthForm from './AuthForm';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm } from '@/store/module/auth';
import { useGetCheckQuery, usePostLoginMutation } from '@/lib/api/client';
import { useRouter } from 'next/navigation';
import { checkFailure, checkSuccess } from '@/store/module/user';

const LoginForm = () => {
  const router = useRouter();
  const [login, { isLoading, error }] = usePostLoginMutation();
  const {
    data: check,
    error: checkError,
    isLoading: checkIsLoading,
  } = useGetCheckQuery();
  const { form, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    user: user.user,
  }));
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
        dispatch(checkSuccess(response));
      } else {
        dispatch(checkFailure(response));
      }
    } catch (err) {
      console.error('Failed to login:', err);
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
      console.log(user);
      dispatch(check());
    }
  }, [check, checkError, dispatch]);

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
    />
  );
};

export default LoginForm;
