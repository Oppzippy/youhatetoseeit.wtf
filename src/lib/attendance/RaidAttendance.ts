import uniqBy from "lodash/uniqBy";

import AttendanceSnapshot from "./AttendanceSnapshot";
import Player from "./Player";
import PlayerRaidStatus from "./PlayerRaidStatus";
import PlayerSerializer from "./PlayerSerializer";

class RaidAttendance {
  snapshotAtStart: AttendanceSnapshot;
  snapshotAtBreak: AttendanceSnapshot;

  constructor(
    snapshotAtStart: AttendanceSnapshot,
    snapshotAtBreak: AttendanceSnapshot
  ) {
    this.snapshotAtStart = snapshotAtStart;
    this.snapshotAtBreak = snapshotAtBreak;
  }

  public getDate(): Date {
    return this.snapshotAtStart.getDate();
  }

  public getPlayers(): Player[] {
    const playersAtStart = this.snapshotAtStart.getPlayers();
    const playersAtBreak = this.snapshotAtBreak.getPlayers();

    const playersWithDuplicates = [...playersAtStart, ...playersAtBreak];
    const players = uniqBy(playersWithDuplicates, (player: Player) => {
      return PlayerSerializer.serialize(player);
    });

    return players;
  }

  public getPlayerStatus(player: Player, alts: Player[]): PlayerRaidStatus {
    const priority = [player, ...alts];
    const startPlayer = this.getPlayerInSnapshotByPriority(
      priority,
      this.snapshotAtStart
    );
    const breakPlayer = this.getPlayerInSnapshotByPriority(
      priority,
      this.snapshotAtBreak
    );
    return {
      startStatus: startPlayer?.status,
      breakStatus: breakPlayer?.status,
    };
  }

  private getPlayerInSnapshotByPriority(
    players: Player[],
    snapshot: AttendanceSnapshot
  ) {
    for (const player of players) {
      const playerAttendance = snapshot.getPlayer(player);
      if (playerAttendance) {
        return playerAttendance;
      }
    }
    return null;
  }
}

export default RaidAttendance;
