const playerSerializer = player =>
  `${player.name.toLowerCase()}-${player.realm.toLowerCase()}`;

export default playerSerializer;
export { playerSerializer };
