import Player from "./Player";

class PlayerSerializer {
  public static serialize(player: Player): string {
    return this.serializeHumanReadable(player).toLowerCase();
  }

  public static serializeHumanReadable(player: Player): string {
    return `${player.name}-${player.realm}`;
  }
}

export default PlayerSerializer;
