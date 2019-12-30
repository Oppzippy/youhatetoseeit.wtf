import { getPlayersFromSnapshots } from "../parsers/AttendanceParser";
import { playerSerializer } from "./PlayerSerializer";

class AttendanceFilter {
  constructor(snapshots) {
    const players = getPlayersFromSnapshots(snapshots);
    this.playerSnapshots = new Map();
    players.forEach(player => {
      this.playerSnapshots[player] = snapshots;
    });
  }
}
