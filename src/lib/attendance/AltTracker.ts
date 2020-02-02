import PlayerSerializer from "./PlayerSerializer";
import Player from "./Player";
import AltPair from "./AltPair";

class AltTracker {
  private mainToAlts: Map<string, Player[]>;
  private altsToMain: Map<string, Player>;

  constructor(altPairs: AltPair[]) {
    this.setAltPairs(altPairs);
  }

  private setAltPairs(altPairs: AltPair[]) {
    this.mainToAlts = new Map();
    this.altsToMain = new Map();
    altPairs.forEach(({ main, alt }) => {
      this.addMain(alt, main);
      this.addAlt(main, alt);
    });
  }

  private addMain(alt: Player, main: Player) {
    const altSerialized = PlayerSerializer.serialize(alt);
    this.altsToMain.set(altSerialized, main);
  }

  private addAlt(main: Player, alt: Player) {
    const mainSerialized = PlayerSerializer.serialize(main);

    let alts = this.mainToAlts.get(mainSerialized);
    if (!alts) {
      alts = [];
      this.mainToAlts.set(mainSerialized, alts);
    }
    alts.push(alt);
  }

  public getMain(alt: Player) {
    const altSerialized = PlayerSerializer.serialize(alt);
    return this.altsToMain.get(altSerialized) ?? alt;
  }

  public getAlts(main: Player) {
    const mainSerialized = PlayerSerializer.serialize(main);
    return this.mainToAlts.get(mainSerialized) ?? [];
  }
}

export default AltTracker;
