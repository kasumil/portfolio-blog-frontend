import React, { useEffect, useState } from 'react';
import AuthForm from '../../components/auth/AuthForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeField,
  initializeForm,
  registerFailure,
} from '@/store/module/auth';
import { checkSuccess } from '@/store/module/user';
import { useGetCheckMutation, usePostRegisterMutation } from '@/lib/api/client';
import { useRouter } from 'next/navigation';
import { createSelector } from '@reduxjs/toolkit';

const RegisterForm = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [register, { isLoading: registerLoading, error: registerError }] =
    usePostRegisterMutation();
  const [
    loginCheck,
    { data: check, error: checkError, isLoading: checkIsLoading },
  ] = useGetCheckMutation();
  const selectAuthAndUser = createSelector(
    (state: Object) => state.auth,
    (state: Object) => state.user,
    (auth, user) => ({
      form: auth.register,
      auth: auth.auth,
      authError: auth.authError,
      user: user.user,
    }),
  );

  const { form, auth, authError, user } = useSelector(selectAuthAndUser);
  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    );
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement login action
    const { username, password, passwordConfirm } = form;
    if ([username, password, passwordConfirm].includes('')) {
      setError('빈 칸을 모두 입력해주세요');
      return;
    }
    if (password !== passwordConfirm) {
      // 비밀번호 다르다고 출력
      setError('비밀번호가 일치하지 않습니다');
      dispatch(changeField({ form: 'register', key: 'password', value: '' }));
      dispatch(
        changeField({ form: 'register', key: 'passwordConfirm', value: '' }),
      );
      return;
    }

    try {
      const ret = await register({ username, password }).unwrap();
      if (ret) {
        dispatch(checkSuccess({ id: ret._id, username }));
      }
    } catch (err) {
      if (err.originalStatus === 409) {
        dispatch(registerFailure({ status: 409, message: 'Conflict' }));
      } else {
        dispatch(registerFailure({ status: err.status, message: err.data }));
      }
    }
  };

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if (authError.status === 409) {
        setError('이미 존재하는 계정입니다');
        return;
      }
      setError('회원가입 실패');
      return;
    }
    if (auth) {
      console.log('로그인 Success');
      console.log(auth);
      loginCheck();
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      router.push('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [user]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default RegisterForm;
