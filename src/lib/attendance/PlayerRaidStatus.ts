import AttendanceSummary from "./AttendanceSummary";

interface PlayerRaidStatus {
  getAggregate(): AttendanceSummary;
}

export default PlayerRaidStatus;
