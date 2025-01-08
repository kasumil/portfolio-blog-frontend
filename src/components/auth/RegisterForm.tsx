import React, { useEffect } from 'react';
import AuthForm from './AuthForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeField,
  initializeForm,
  registerFailure,
} from '@/store/module/auth';
import { checkSuccess } from '@/store/module/user';
import { useGetCheckQuery, usePostRegisterMutation } from '@/lib/api/client';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const router = useRouter();
  const [register, { isLoading, error }] = usePostRegisterMutation();
  const {
    data: check,
    error: checkError,
    isLoading: checkIsLoading,
  } = useGetCheckQuery();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

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
    if (password !== passwordConfirm) {
      // 비밀번호 다르다고 출력
      console.log('언매칭');
      return;
    }

    try {
      const ret = await register({ username, password }).unwrap();
      if (ret) {
        dispatch(checkSuccess({ id: ret._id, username }));
      }
    } catch (err) {
      dispatch(registerFailure('로그인 실패'));
    }
  };

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log('로그인 Error');
      console.log(authError);
      return;
    }
    if (auth) {
      console.log('로그인 Success');
      console.log(auth);
      console.log(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default RegisterForm;
