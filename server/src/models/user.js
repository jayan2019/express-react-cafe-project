// const connection = require('../services/db')

// const getAllUsersDada = () => {
//     // await connection.query('SELECT * FROM users', (err, rows, fields) => {
//     //     if (err) throw err
//     //     console.log('The solution is: ', rows)
//     //     res.status(200).json({ data: rows });
//     // })

//     return connection.query('SELECT * FROM users')
// };

// module.exports = { getAllUsersDada }

const db = require("../services/db");

// Create base modl abd extend it here
class User {
  constructor(
    id,
    email,
    password,
    first_name,
    last_name,
    cafe_id,
    refresh_token
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.first_name = first_name;
    this.last_name = last_name;
    this.cafe_id = cafe_id;
    this.refresh_token = refresh_token;
  }

  static async create({ email, password, first_name, last_name, cafe_id }) {
    const result = await db.query(
      "INSERT INTO users (email, password, first_name, last_name, cafe_id) VALUES (?, ?, ?, ?, ?)",
      [email, password, first_name, last_name, cafe_id]
    );
    return new User(result.insertId, email, first_name, last_name, cafe_id);
  }

  static async getAll() {
    const results = await db.query(
      "SELECT id, email, first_name, last_name, cafe_id FROM users"
    );
    // const results = await db.query(
    //   "SELECT * FROM users INNER JOIN cafes ON users.cafe_id = cafes.id"
    // );
    return results;
  }

  static async findById(id) {
    const results = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    if (!results.length) return null;
    const { email, password, first_name, last_name, cafe_id, refresh_token } =
      results[0];
    return new User(
      id,
      email,
      password,
      first_name,
      last_name,
      cafe_id,
      refresh_token
    );
  }

  static async findByEmail({ email }) {
    const results = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (!results.length) return null;
    const { id, password, first_name, last_name, cafe_id, refresh_token } =
      results[0];
    return new User(
      id,
      email,
      password,
      first_name,
      last_name,
      cafe_id,
      refresh_token
    );
  }

  static async findByToken({ token }) {
    const results = await db.query(
      "SELECT * FROM users WHERE refresh_token = ?",
      [token]
    );
    if (!results.length) return null;
    const { id, email, first_name, last_name, cafe_id, refresh_token } =
      results[0];
    return new User(id, email, first_name, last_name, cafe_id, refresh_token);
  }

  static async updateToken({ refresh_token, id }) {
    const results = await db.query(
      "UPDATE users SET refresh_token = ? WHERE id = ?",
      [refresh_token, id]
    );
    if (!results.length) return null;
    const { email, password, first_name, last_name, cafe_id } = results[0];
    return new User(
      id,
      email,
      password,
      first_name,
      last_name,
      cafe_id,
      refresh_token
    );
  }
}

module.exports = User;
