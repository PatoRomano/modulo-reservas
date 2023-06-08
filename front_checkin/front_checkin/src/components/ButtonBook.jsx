import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  background-color: #2196f3;
  color: #ffffff;
  cursor: pointer;
  
  &:hover {
    background-color: #0d8bf2;
  }
`;

const ButtonBook = ({ children, onButtonClick, ...rest }) => {
  const handleClick = (event) => {
    event.preventDefault();
    onButtonClick(event);
  };

  return <Button {...rest} onClick={handleClick}>{children}</Button>;
};

export default ButtonBook;