import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  input {
    padding: 8px;
    border: 1px solid var(--color-white);
    border-radius: 5px;
    margin-right: 8px;
  }
`;

export const Selector = styled.select`
  padding: 8px;
  width: 20%;
  border: 1px solid var(--color-white);
  border-radius: 5px;
  margin-right: 8px;
`;

export const AddListButton = styled.button`
  background-color: var(--color-green);
  color: white;
  padding: 8px;
  width: 30px;
  border: none;
  border-radius: 5px;

  cursor: pointer;
  &:hover {
    background-color: var(--color-teal);
  }
`;

export const ListOption = styled.option``;
