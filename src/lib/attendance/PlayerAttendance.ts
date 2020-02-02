import Player from "./Player";
import AttendanceStatus from "./AttendanceStatus";

interface PlayerAttendance {
  player: Player;
  status: AttendanceStatus;
  zone?: string;
}

export default PlayerAttendance;
