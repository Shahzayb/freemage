import styled from 'styled-components';

export default styled.button`
  display: inline-block;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  text-decoration: none;
  color: #fff;
  background-color: #3cb46e;
  user-select: none;
  outline: none;
  border: none;
  transition: background-color 0.5s;
  &:hover,
  &:focus {
    background-color: #2e9e5d;
  }
`;
