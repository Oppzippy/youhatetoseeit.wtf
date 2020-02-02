import PlayerAttendance from "./PlayerAttendance";
import PlayerSerializer from "./PlayerSerializer";
import Player from "./Player";

class AttendanceSnapshot {
  private date: Date;
  private playerAttendances: PlayerAttendance[];
  private playerAttendanceMap: Map<string, PlayerAttendance>;

  public constructor(date: Date, playerAttendances: PlayerAttendance[]) {
    this.date = date;
    this.playerAttendances = playerAttendances;
    this.mapPlayerAttendance();
  }

  private mapPlayerAttendance() {
    this.playerAttendanceMap = new Map();
    this.playerAttendances.forEach(playerAttendance => {
      const serializedName = PlayerSerializer.serialize(
        playerAttendance.player
      );
      this.playerAttendanceMap.set(serializedName, playerAttendance);
    });
  }

  public getPlayers(): Player[] {
    return this.playerAttendances.map(
      playerAttendance => playerAttendance.player
    );
  }

  public getPlayer(player: Player): PlayerAttendance {
    return this.playerAttendanceMap.get(PlayerSerializer.serialize(player));
  }

  public getDate(): Date {
    return this.date;
  }
}

export default AttendanceSnapshot;
