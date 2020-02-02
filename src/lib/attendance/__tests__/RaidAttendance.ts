import RaidAttendance from "../RaidAttendance";
import AttendanceSnapshot from "../AttendanceSnapshot";

function createRaidAttendance() {
  const p1 = {
    name: "Hunter",
    realm: "Illidan",
  };
  const p2 = {
    name: "Priest",
    realm: "Illidan",
  };
  const snapshotAtStart = new AttendanceSnapshot(new Date(), [
    {
      player: p1,
      status: {
        isOnline: true,
        isInGroup: true,
      },
    },
    {
      player: p2,
      status: {
        isOnline: true,
        isInGroup: false,
      },
    },
  ]);
  const snapshotAtBreak = new AttendanceSnapshot(new Date(), [
    {
      player: p1,
      status: {
        isOnline: true,
        isInGroup: true,
      },
    },
    {
      player: p2,
      status: {
        isOnline: false,
        isInGroup: false,
      },
    },
  ]);
  return new RaidAttendance(snapshotAtStart, snapshotAtBreak);
}

describe("RaidAttendance", () => {
  it("has the correct number of players", () => {
    const attendance = createRaidAttendance();
    expect(attendance.getPlayers()).toHaveLength(2);
  });

  it("has a 0th player", () => {
    const attendance = createRaidAttendance();
    expect(attendance.getPlayers()[0]?.name).toEqual("Hunter");
  });

  it("has the first player", () => {
    const attendance = createRaidAttendance();
    expect(
      attendance.getPlayerStatus({
        name: "Hunter",
        realm: "Illidan",
      })
    ).toBeTruthy();
  });

  it("handles alts", () => {
    const attendance = createRaidAttendance();
    const { startStatus, breakStatus } = attendance.getPlayerStatus(
      {
        name: "Doesn't exist",
        realm: "None",
      },
      [
        {
          name: "Priest",
          realm: "Illidan",
        },
      ]
    );
    expect(startStatus?.isOnline).toEqual(true);
    expect(startStatus?.isInGroup).toEqual(false);
    expect(breakStatus?.isOnline).toEqual(false);
    expect(breakStatus?.isInGroup).toEqual(false);
  });
});
