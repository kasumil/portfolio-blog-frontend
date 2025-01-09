'use client';

import palette from '@/lib/styles/palette';
import { useRouter } from 'next/navigation';
import React from 'react';
import styled, { css } from 'styled-components';

type Props = {
  fullWidth?: boolean; // Specify optional props
  cyan?: boolean;
  [key: string]: any; // Allow additional props for spreading
};

const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'fullWidth' && prop !== 'cyan', // 필터링
})<Props>`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }

  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `};

  ${(props) =>
    props.cyan &&
    css`
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `};
`;

const Button: React.FC<Props> = ({ href, fullWidth, cyan, ...rest }) => {
  const router = useRouter();
  const onClick = (e) => {
    if (href) {
      router.push(href);
    }
    if (rest.onClick) {
      rest.onClick(e);
    }
  };
  return (
    <StyledButton
      fullWidth={fullWidth}
      cyan={cyan}
      onClick={onClick}
      {...rest}
    />
  );
};

export default Button;
