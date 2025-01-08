import palette from '@/lib/styles/palette';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
  background: string;
};

const AuthTemplateBlock = ({ children }: Props) => {
  return <AuthTemplateBlockWrapper>{children}</AuthTemplateBlockWrapper>;
};

const AuthTemplateBlockWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${palette.gray[2]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WhiteBox = ({ children }: { children: ReactNode }) => {
  return <WhiteBoxShadow>{children}</WhiteBoxShadow>;
};

const WhiteBoxShadow = styled.div`
  .logo-area {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    letter-spacing: 2px;
  }
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 360px;
  background: white;
  border-radius: 2px;
`;

function AuthPlate({ children }: Props) {
  return (
    <AuthTemplateBlock>
      <WhiteBox>
        <div className="logo-area">REACTERS</div>
        {children}
      </WhiteBox>
    </AuthTemplateBlock>
  );
}

export default AuthPlate;
