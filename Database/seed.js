var sqlite3 = require('sqlite3'),
    db = new sqlite3.Database('finalproj.sqlite3'),
    encryption = require('./encryption');

// Create the database schema and populate
db.serialize(function() {
  
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT UNIQUE  COLLATE NOCASE NOT NULl, fname TEXT, lname TEXT, email TEXT, coins INTEGER, admin BOOLEAN, blocked BOOLEAN, password_digest TEXT, salt TEXT)");
  var salt = encryption.salt();
  db.run("CREATE TABLE IF NOT EXISTS game (id INTEGER PRIMARY KEY, winner TEXT)");
  
  db.run("INSERT INTO users (username, fname, lname, email, coins, admin, blocked, password_digest, salt) VALUES (?,?,?,?,?,?,?,?,?)",
    'test404',
    'No Coin',
    'Broke',
    'test404@test.edu',
    2,
    false,
    false,
    encryption.digest('000000' + salt),
    salt
  );
  // db.run("INSERT INTO game(id) VALUES (?)",0);
});