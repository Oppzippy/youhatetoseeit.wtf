// Libraries
import styled from "styled-components";

const Table = styled.div`
  margin: 1em 0;
  display: grid;
  grid-template-rows: 2em repeat(${props => props.rows}, 50px);
  grid-template-columns: 10em repeat(${props => props.columns}, 50px);
  grid-row-gap: 2px;
  background-color: var(--bg-color-light-2);
  overflow-x: auto;
  width: 80vw;
  height: 100%;
`;

const TopHeader = styled.div`
  grid-row: 1;
  background-color: inherit;
`;

const LeftHeader = styled.div`
  grid-column: 1;
  background-color: inherit;
  position: sticky;
  left: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 1em;
`;

const TopLeftHeader = styled.div`
  z-index: 1;
  grid-column: 1;
  grid-row: 1;
  background-color: inherit;
  position: sticky;
  left: 0;
  top: 0;
  display: flex;
  justify-content: flex-end;
  padding-right: 1em;
`;

export { Table, TopHeader, LeftHeader, TopLeftHeader };
