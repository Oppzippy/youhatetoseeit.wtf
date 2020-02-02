import PlayerAttendance from "./PlayerAttendance";
import AttendanceSnapshot from "./AttendanceSnapshot";
import AttendanceStatus from "./AttendanceStatus";

class AttendanceSnapshotParser {
  private attendanceStr: string;

  public constructor(attendanceStr: string) {
    this.attendanceStr = attendanceStr;
  }

  public parse(): AttendanceSnapshot {
    return this.parseAttendanceString(this.attendanceStr);
  }

  private parseAttendanceString(attendanceString: string): AttendanceSnapshot {
    const entries = attendanceString.split(";");
    const [dateString, ...rawAttendance] = entries;

    const date = new Date(dateString);
    const players = rawAttendance
      .filter(str => str.length > 0)
      .map(attendance => this.parsePlayerEntry(attendance));

    return new AttendanceSnapshot(date, players);
  }

  private parsePlayerEntry(entry: string): PlayerAttendance {
    const [fullName, status, zone] = entry.split("`");
    const [name, realm] = fullName.split("-");

    const statusNumber = parseInt(status);

    return {
      player: {
        name,
        realm,
      },
      status: this.parseStatus(statusNumber),
      zone,
    };
  }

  private parseStatus(status: number): AttendanceStatus {
    return {
      isOnline: status > 0,
      isInGroup: status == 1,
    };
  }
}

export default AttendanceSnapshotParser;
