import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  background-color: #e53935;
  color: #ffffff;
  margin :15px;
  cursor: pointer;

  &:hover {
    background-color: #c62828;
  }
`;

const ButtonCancel = ({ children, onButtonClick, ...rest }) => {
  const handleClick = (event) => {
    event.preventDefault();
    onButtonClick(event);
  };

  return <Button {...rest} onClick={handleClick}>{children}</Button>;
};

export default ButtonCancel;