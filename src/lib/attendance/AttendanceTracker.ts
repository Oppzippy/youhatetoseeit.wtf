import uniqBy from "lodash/uniqBy";
import RaidAttendance from "./RaidAttendance";
import PlayerSerializer from "./PlayerSerializer";
import Player from "./Player";
import AltTracker from "./AltTracker";

class AttendanceTracker {
  private raids: RaidAttendance[];
  private altTracker: AltTracker;
  private startDate: Date;
  private endDate: Date;

  public constructor(raids: RaidAttendance[]) {
    this.raids = raids;
  }

  public getPlayers(): Player[] {
    const playersWithDuplicates = this.raids
      .map(raid => raid.getPlayers())
      .flat()
      .map(player => this.altTracker.getMain(player));
    const players = uniqBy(playersWithDuplicates, (player: Player) => {
      return PlayerSerializer.serialize(player);
    });
    return players;
  }

  public getAttendanceForPlayer(player: Player) {
    const raids = this.getRaids();
    let found = false;
    return raids.map(raid => {
      const status = raid.getPlayerStatus(
        player,
        this.altTracker.getAlts(player)
      );
      if (status) {
        found = true;
      }
      if (found) {
        return status;
      }
    });
  }

  public getRaids(): RaidAttendance[] {
    if (!this.startDate && !this.endDate) {
      return this.raids;
    }

    return this.raids.filter(raid => {
      if (this.startDate && this.startDate > raid.getDate()) {
        return false;
      }
      if (this.endDate && this.endDate < raid.getDate()) {
        return false;
      }
      return true;
    });
  }

  public getStartDate(): Date {
    return this.startDate;
  }

  public getEndDate(): Date {
    return this.endDate;
  }

  public setStartDate(date: Date) {
    this.startDate = date;
  }

  public setEndDate(date: Date) {
    this.endDate = date;
  }
}
