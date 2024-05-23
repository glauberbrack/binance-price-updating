import React from "react";
import styled from "styled-components";
import { Sidebar, Table } from "../../components/common";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin: 0 12px;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 16px;
  }
`;

export const Dashboard: React.FC = () => {
  return (
    <Container>
      <Sidebar />
      <Table />
    </Container>
  );
};
