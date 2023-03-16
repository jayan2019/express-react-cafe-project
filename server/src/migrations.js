const connection = require("./services/db");

(async () => {
  await connection.query(`CREATE TABLE IF NOT EXISTS cafes (
        id INT(8) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        address VARCHAR(255)
    )`);

  await connection.query(`CREATE TABLE IF NOT EXISTS users (
        id INT(8) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        cafe_id INT(8) NULL,
        refresh_token VARCHAR(255) NULL
    )`);

  // await connection.query(`ALTER TABLE users ADD COLUMN cafe_id INT(8)`);

  process.exit(0);
})();
