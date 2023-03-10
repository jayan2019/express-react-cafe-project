const db = require("../services/db");

class Cafe {
  constructor(id, name, address) {
    this.id = id;
    this.name = name;
    this.address = address;
  }

  static async create({ name, address }) {
    const result = await db.query(
      "INSERT INTO cafes (name, address) VALUES (?, ?)",
      [name, address]
    );
    return new Cafe(result.insertId, name, address);
  }

  static async getAll() {
    const result = await db.query("SELECT * FROM cafes");
    return result;
  }
}

module.exports = Cafe;
