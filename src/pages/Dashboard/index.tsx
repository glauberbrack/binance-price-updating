import { Sidebar, ListSelector, Table } from "../../components/common";

import styled from "styled-components";

const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 16px;
  }
`;

export const Dashboard = () => {
  return (
    <DashboardWrapper>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <ListSelector />
        <Table />
      </div>
    </DashboardWrapper>
  );
};
