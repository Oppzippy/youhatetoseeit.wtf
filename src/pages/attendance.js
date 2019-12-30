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
import { filterRaiders } from "../helpers/AttendanceHelpers";
import "../components/Layout.css";

const Style = styled.div`
  color: var(--bg-color-dark);
  background-color: var(--bg-color-light);
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  min-height: 100vh;
`;

const Label = styled.label`
  font-size: 1.2rem;
  margin-right: 10px;
`;

const PaddedContainer = styled.main`
  display: flex;
  background-color: white;
  padding: 20px;
  box-shadow: 4px 4px 4px var(--shadow-color);
  width: 90%;
  height: 90vh;
`;

export default props => {
  const [isRaidersOnly, setRaidersOnly] = useState(true);

  return (
    <Style>
      <Helmet>
        <title>&lt;You Hate to See It&gt; Attendance</title>
      </Helmet>
      <div>
        <Label htmlFor="raiders-only">Raiders Only</Label>
        <input
          type="checkbox"
          id="raiders-only"
          checked={isRaidersOnly}
          onChange={() => setRaidersOnly(!isRaidersOnly)}
        />
        <Link to="/attendance-summary">Summary</Link>
      </div>
      <PaddedContainer>
        <RaiderProvider>
          <AttendanceProvider>
            <RaiderContext.Consumer>
              {raiders => (
                <AttendanceContext.Consumer>
                  {attendance => {
                    let filteredAttendance = attendance;
                    if (isRaidersOnly) {
                      filteredAttendance = filterRaiders(
                        filteredAttendance,
                        raiders
                      );
                    }
                    return <AttendanceTable attendance={filteredAttendance} />;
                  }}
                </AttendanceContext.Consumer>
              )}
            </RaiderContext.Consumer>
          </AttendanceProvider>
        </RaiderProvider>
      </PaddedContainer>
    </Style>
  );
};
