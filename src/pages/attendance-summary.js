import React, { useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { RaiderProvider, RaiderContext } from "../providers/RaiderProvider";
import {
  AttendanceProvider,
  AttendanceContext,
} from "../providers/AttendanceProvider";
import AttendanceTable from "../components/attendance/AttendanceTable";
import AttendanceSummary from "../components/attendance/AttendanceSummary";
import { filterRaiders } from "../parsers/AttendanceParser";
import "../components/Layout.css";

const Style = styled.div`
  color: var(--bg-color-dark);
  min-height: 100vh;
  background-color: var(--bg-color-light);
`;

export default () => {
  return (
    <Style>
      <Helmet>
        <title>&lt;You Hate to See It&gt; Attendance</title>
      </Helmet>
      <Link to="/attendance">Details</Link>
      <AttendanceProvider>
        <RaiderProvider>
          <AttendanceContext.Consumer>
            {attendance => (
              <RaiderContext.Consumer>
                {raiders => (
                  <AttendanceSummary
                    attendance={attendance}
                    raiders={raiders}
                  />
                )}
              </RaiderContext.Consumer>
            )}
          </AttendanceContext.Consumer>
        </RaiderProvider>
      </AttendanceProvider>
    </Style>
  );
};
