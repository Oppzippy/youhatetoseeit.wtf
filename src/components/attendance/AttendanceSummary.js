import React from "react";
import styled from "styled-components";
import { filterRaiders } from "../../parsers/AttendanceParser";
import AttendanceSummaryTable from "./AttendanceSummaryTable";
import ContentBox from "../ContentBox";

const Container = styled.div`
  column-count: 2;
  @media (max-width: 1200px) {
    column-count: 1;
  }
`;

const CustomContentBox = styled(ContentBox)`
  display: flex;
  justify-content: center;
`;

export default props => {
  let { attendance } = props;
  if (false) {
    attendance = filterRaiders(attendance, props.raiders);
  }
  return (
    <Container>
      <CustomContentBox>
        <AttendanceSummaryTable attendance={attendance} />
      </CustomContentBox>
    </Container>
  );
};
