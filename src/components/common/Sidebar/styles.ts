import { styled } from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  background-color: var(--color-white);
  border-radius: 16px;

  padding: 8px;

  @media (min-width: 768px) {
    width: 30%;
    padding: 16px 20px;
  }
`;

export const SearchInput = styled.input`
  width: calc(100% - 20px);
  padding: 14px 8px;
  margin: 10px 0 20px;
  border: none;
  background-color: var(--color-bg);
  border-radius: 5px;
`;

export const ListWrapper = styled.div`
  border: 1px solid var(--color-light);

  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
  overflow: hidden;
`;

export const AddButton = styled.button<{ pendingChanges: boolean }>`
  background-color: var(--color-dark);
  color: var(--color-white);
  padding: 10px;
  border: none;
  border-radius: 5px;
  opacity: ${({ pendingChanges }) => (pendingChanges ? 1 : 0.6)};
  cursor: ${({ pendingChanges }) => (pendingChanges ? "pointer" : undefined)};
  &:hover {
    background-color: ${({ pendingChanges }) =>
      pendingChanges ? "#343a40" : "#070707"};
  }
`;
