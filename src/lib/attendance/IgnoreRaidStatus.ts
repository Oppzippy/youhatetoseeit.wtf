import AttendanceSummary from "./AttendanceSummary";
import PlayerRaidStatus from "./PlayerRaidStatus";

class IgnoreRaidStatus implements PlayerRaidStatus {
  public getAggregate(): AttendanceSummary {
    return AttendanceSummary.IGNORE;
  }
}

export default IgnoreRaidStatus;
