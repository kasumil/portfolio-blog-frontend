'use client';

import React from 'react';
import Header from '../../components/common/Header';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { usePostLogoutMutation } from '@/lib/api/client';
import { userLogOut } from '@/store/module/user';

type Props = {};

function HeaderConatiner({}: Props) {
  const dispatch = useDispatch();
  const userAuthSelector = createSelector(
    (state: Object) => state.user,
    (user) => ({
      user: user.user,
    }),
  );
  const { user } = useSelector(userAuthSelector);
  const [logout, { isLoading, error }] = usePostLogoutMutation();

  const logoutHandler = async () => {
    try {
      const ret = await logout();
      if (ret) {
        dispatch(userLogOut());
      }
    } catch (e) {
      console.log(e);
      console.log('user is not Logout');
    }
  };
  return <Header user={user} logout={logoutHandler} />;
}

export default HeaderConatiner;
