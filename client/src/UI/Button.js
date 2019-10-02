import styled from 'styled-components';

export default styled.button`
  font-family: inherit;
  display: inline-block;
  cursor: pointer;
  border-radius: 3px;
  text-decoration: none;
  color: #fff;
  background-color: var(--color-primary-light);
  user-select: none;
  outline: none;
  border: none;
  transition: background-color 0.5s;
  &:hover,
  &:focus {
    background-color: var(--color-primary-dark);
  }
`;
