import palette from '@/lib/styles/palette';
import React from 'react';
import styled from 'styled-components';

type Props = {
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

const InputField = ({
  name,
  type,
  value,
  onChange,
  placeholder,
  error,
}: Props) => {
  if (!['text', 'password', 'username', 'number'].includes(type)) {
    throw new Error(`Unsupported input type: ${type}`);
  }

  return (
    <>
      <StyledInput
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <span>{error}</span>}
    </>
  );
};

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

export default InputField;
