class Cockpit {
  constructor(path) {
    this.path = path;
  }

  async fetch(url) {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }

  getCollection(name) {
    const url = `${this.path}/api/collections/get/${name}`;
    return this.fetch(url);
  }
}

export default Cockpit;
