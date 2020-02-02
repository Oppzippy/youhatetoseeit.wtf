import AttendanceSummary from "./AttendanceSummary";
import PlayerRaidStatus from "./PlayerRaidStatus";

class IgnoreRaidStatus implements PlayerRaidStatus {
  public getSummary(): AttendanceSummary {
    return AttendanceSummary.IGNORE;
  }
}

export default IgnoreRaidStatus;
