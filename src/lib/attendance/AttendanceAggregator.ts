import PlayerRaidStatus from "./PlayerRaidStatus";
import AttendanceSummary from "./AttendanceSummary";

class AttendanceAggregator {
  private attendance: PlayerRaidStatus[];
  constructor(attendance: PlayerRaidStatus[]) {
    this.attendance = attendance.filter(
      status => status.getSummary() != AttendanceSummary.IGNORE
    );
  }

  public getPresent() {
    return this.getPercentage([AttendanceSummary.PRESENT]);
  }

  public getShowedUp() {
    return this.getPercentage([
      AttendanceSummary.PRESENT,
      AttendanceSummary.ARRIVED_LATE,
      AttendanceSummary.LEFT_EARLY,
    ]);
  }

  public getTardy() {
    return this.getPercentage([AttendanceSummary.ARRIVED_LATE]);
  }

  public getLeftEarly() {
    return this.getPercentage([AttendanceSummary.LEFT_EARLY]);
  }

  public getNotInGroup() {
    return this.getPercentage([AttendanceSummary.NOT_IN_GROUP]);
  }

  private getPercentage(summary: AttendanceSummary[]) {
    if (this.attendance.length > 0) {
      const count = this.count(summary);
      return count / this.attendance.length;
    }
    return 0;
  }

  private count(summary: AttendanceSummary[]) {
    const count = this.attendance.reduce(
      (acc, curr) => (summary.includes(curr.getSummary()) ? acc + 1 : acc),
      0
    );
    return count;
  }
}

export default AttendanceAggregator;
