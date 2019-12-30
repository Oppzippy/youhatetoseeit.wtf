import React from "react";
import styled from "styled-components";
import { filterRaiders } from "../../parsers/AttendanceParser";
import AttendanceSummaryTable from "./AttendanceSummaryTable";
import ContentBox from "../ContentBox";

const Container = styled.div`
  column-count: 3;
`;

export default props => {
  let snapshots = props.attendance;
  if (false) {
    snapshots = filterRaiders(snapshots, props.raiders);
  }
  return (
    <Container>
      <ContentBox>
        <AttendanceSummaryTable snapshots={snapshots} />
      </ContentBox>
    </Container>
  );
};
