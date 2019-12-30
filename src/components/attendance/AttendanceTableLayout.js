import styled from "styled-components";

const Table = styled.div`
  display: grid;
  grid-template-rows: 2em repeat(${props => props.rows}, 50px);
  grid-template-columns: 10em repeat(${props => props.columns}, 50px);
  grid-row-gap: 2px;
  background-color: #fff;
  overflow: auto;
  width: 100%;
  height: 100%;
`;

const TopHeader = styled.div`
  grid-row: 1;
  background-color: inherit;
  position: sticky;
  top: 0;
`;

const LeftHeader = styled.div`
  grid-column: 1;
  background-color: inherit;
  position: sticky;
  left: 0;
`;

const TopLeftHeader = styled.div`
  z-index: 1;
  grid-column: 1;
  grid-row: 1;
  background-color: inherit;
  position: sticky;
  left: 0;
  top: 0;
`;

export { Table, TopHeader, LeftHeader, TopLeftHeader };
