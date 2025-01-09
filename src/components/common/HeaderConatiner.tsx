import React from 'react';
import Header from './Header';
import { useSelector } from 'react-redux';

type Props = {};

function HeaderConatiner({}: Props) {
  const { user } = useSelector(({ user }: Object) => {
    user: user.user;
  });
  return <Header user={user} />;
}

export default HeaderConatiner;
