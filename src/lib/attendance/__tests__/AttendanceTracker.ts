import AttendanceSnapshot from "../AttendanceSnapshot";
import RaidAttendance from "../RaidAttendance";
import AttendanceTracker from "../AttendanceTracker";
import PlayerRaidStatus from "../PlayerRaidStatusImpl";

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

function createRaidAttendance2() {
  const p1 = {
    name: "Hunter",
    realm: "Illidan",
  };
  const p2 = {
    name: "Priest",
    realm: "Illidan",
  };
  const p3 = {
    name: "Warrior",
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
      player: p3,
      status: {
        isOnline: true,
        isInGroup: true,
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
      player: p3,
      status: {
        isOnline: true,
        isInGroup: true,
      },
    },
  ]);
  return new RaidAttendance(snapshotAtStart, snapshotAtBreak);
}

function createAttendanceTracker() {
  return new AttendanceTracker([
    createRaidAttendance(),
    createRaidAttendance2(),
  ]);
}

describe("RaidAttendance", () => {
  it("has the correct players", () => {
    const tracker = createAttendanceTracker();
    expect(tracker.getPlayers()).toHaveLength(3);
    expect(tracker.getPlayers()[0]?.name).toEqual("Hunter");
  });

  it("returns proper attendance", () => {
    const tracker = createAttendanceTracker();
    const attendance = tracker.getAttendanceForPlayer({
      name: "Hunter",
      realm: "Illidan",
    });
    const first = attendance[0];
    expect(first).toBeTruthy();
  });

  it("tracks absent players", () => {
    const tracker = createAttendanceTracker();
    const attendance = tracker.getAttendanceForPlayer({
      name: "Priest",
      realm: "Illidan",
    });
    expect(attendance[0]).toBeTruthy();
    expect(attendance[1]).toBeTruthy();
  });

  it("doesn't track people who haven't shown up", () => {
    const tracker = createAttendanceTracker();
    const attendance = tracker.getAttendanceForPlayer({
      name: "Warrior",
      realm: "Illidan",
    });
    expect(attendance[0]).toBeFalsy();
    expect(attendance[1]).toBeTruthy();
  });

  //it("tracks players that haven't joined yet", () => {});
});
