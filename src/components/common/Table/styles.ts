import styled from "styled-components";

export const TableWrapper = styled.div`
  width: 100%;
  background-color: var(--color-white);
  border-radius: 16px;
  overflow-x: auto;
  padding: 16px 8px;

  margin-top: 16px;
  font-size: 12px;

  @media (min-width: 768px) {
    margin-top: 0px;
    padding: 16px 20px;
    font-size: 14px;
  }
`;

export const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background-color: var(--color-orange);
  color: var(--color-white);
  border-radius: 5px;
  margin-bottom: 8px;
  font-weight: bold;

  @media (min-width: 768px) {
    padding: 16px;
    font-size: 14px;
  }
`;

export const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  border-bottom: 1px solid var(--color-light);

  &:last-child {
    border-bottom: none;
  }

  @media (min-width: 768px) {
    padding: 16px;
  }
`;

export const TableCell = styled.div`
  flex: 1;
  text-align: center;
  padding: 4px;

  &:first-child {
    text-align: left;
  }

  &:last-child {
    text-align: right;
  }
`;

export const RemoveButton = styled.button`
  background-color: var(--color-danger);
  color: var(--color-white);
  border: none;
  border-radius: 5px;
  padding: 2px 12px;
  cursor: pointer;
  &:hover {
    background-color: var(--color-red);
  }

  font-size: 12px;

  @media (min-width: 768px) {
    font-size: 14px;
  }
`;
