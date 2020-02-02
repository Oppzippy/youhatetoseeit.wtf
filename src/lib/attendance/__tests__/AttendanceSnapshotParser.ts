import AttendanceSnapshotParser from "../AttendanceSnapshotParser";

function getSnapshot() {
  const snapshotStr =
    "01/30/20;Reticha-Illidan`2`Dazar'alor;Sackalack-Illidan`2`Dazar'alor;Dominiwo-Illidan`1`Ny'alotha, the Waking City;Fòxxy-Illidan`1`Ny'alotha, the Waking City;Grezlul-Illidan`1`Ny'alotha, the Waking City;Reyleda-Illidan`1`Ny'alotha, the Waking City;Zmeu-Illidan`1`Ny'alotha, the Waking City;Canigetarez-Illidan`1`Ny'alotha, the Waking City;Chillebeam-Illidan`1`Ny'alotha, the Waking City;Codestâ-Illidan`1`Ny'alotha, the Waking City;Gosulock-Illidan`1`Ny'alotha, the Waking City;Rekfu-Illidan`1`Ny'alotha, the Waking City;Seamoree-Illidan`1`Ny'alotha, the Waking City;Sjoks-Illidan`1`Ny'alotha, the Waking City;Sokaa-Illidan`1`Ny'alotha, the Waking City;Thiccfox-Illidan`1`Ny'alotha, the Waking City;Tkulu-Illidan`1`Ny'alotha, the Waking City;Mercifulfatë-Illidan`2`Dazar'alor;Oppzip-Illidan`1`Ny'alotha, the Waking City;Ethr-Illidan`1`Ny'alotha, the Waking City;Theology-Illidan`1`Ny'alotha, the Waking City;Coüch-Illidan`1`Ny'alotha, the Waking City";
  const snapshotParser = new AttendanceSnapshotParser(snapshotStr);
  return snapshotParser.parse();
}

describe("AttendanceSnapshotParser", () => {
  it("parses the date", () => {
    const snapshot = getSnapshot();
    expect(snapshot.getDate()).toEqual(new Date("01/30/2020"));
  });
  it("parses the correct number of players", () => {
    const snapshot = getSnapshot();
    expect(snapshot.getPlayers()).toHaveLength(22);
  });
  it("parses an online not in group player right", () => {
    const snapshot = getSnapshot();
    const player = snapshot.getPlayer({
      name: "Reticha",
      realm: "Illidan",
    });
    const { isOnline, isInGroup } = player.status;
    expect(isOnline).toBeTruthy();
    expect(isInGroup).toBeFalsy();
  });
});
