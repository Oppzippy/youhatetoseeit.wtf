import AttendanceStatus from "./AttendanceStatus";
import AttendanceSummary from "./AttendanceSummary";
import PlayerRaidStatus from "./PlayerRaidStatus";

class PlayerRaidStatusImpl implements PlayerRaidStatus {
  public startStatus: AttendanceStatus;
  public breakStatus: AttendanceStatus;
  constructor(startStatus: AttendanceStatus, breakStatus: AttendanceStatus) {
    this.startStatus = startStatus;
    this.breakStatus = breakStatus;
  }

  public getSummary(): AttendanceSummary {
    const startStatus = this.startStatus;
    const breakStatus = this.breakStatus;
    if (!startStatus && !breakStatus) {
      return AttendanceSummary.IGNORE;
    }
    if (!startStatus) {
      return breakStatus.isOnline
        ? AttendanceSummary.ARRIVED_LATE
        : AttendanceSummary.ABSENT;
    }
    if (!breakStatus) {
      return startStatus.isOnline
        ? AttendanceSummary.LEFT_EARLY
        : AttendanceSummary.ABSENT;
    }

    if (startStatus.isOnline && breakStatus.isOnline) {
      if (startStatus.isInGroup && breakStatus.isInGroup) {
        return AttendanceSummary.PRESENT;
      }
      if (startStatus.isInGroup && !breakStatus.isInGroup) {
        return AttendanceSummary.JOINED_GROUP_LATE;
      }
      if (!startStatus.isInGroup && breakStatus.isInGroup) {
        return AttendanceSummary.LEFT_GROUP_EARLY;
      }
      return AttendanceSummary.NOT_IN_GROUP;
    }

    if (startStatus.isOnline && !breakStatus.isOnline) {
      return AttendanceSummary.LEFT_EARLY;
    }
    if (!startStatus.isOnline && breakStatus.isOnline) {
      return AttendanceSummary.ARRIVED_LATE;
    }
    return AttendanceSummary.ABSENT;
  }
}

export default PlayerRaidStatusImpl;
