'use client';

import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import Button from './Button';
import Link from 'next/link';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }

  .right {
    display: flex;
    align-items: center;
  }
`;

const Spacer = styled.div`
  height: 4rem;
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

function Header({ user, logout }) {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link href="/" className="logo">
            REACTERS
          </Link>
          {user ? (
            <div className="right">
              <UserInfo>{user?.username}</UserInfo>
              <Button onClick={logout}>로그아웃</Button>
            </div>
          ) : (
            <div className="right">
              <Button href={'/login'}>로그인</Button>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
}

export default Header;
