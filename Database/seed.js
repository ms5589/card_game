var sqlite3 = require('sqlite3'),
    db = new sqlite3.Database('finalproj.sqlite3'),
    encryption = require('./encryption');

// Create the database schema and populate
db.serialize(function() {
  
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT UNIQUE  COLLATE NOCASE, fname TEXT NOT NULL, lname TEXT NOT NULL, email TEXT, admin BOOLEAN, blocked BOOLEAN, password_digest TEXT, salt TEXT)");
  var salt = encryption.salt();
  db.run("INSERT INTO users (username, fname, lname, email, admin, blocked, password_digest, salt) VALUES (?,?,?,?,?,?,?,?)",
    'gandhim',
    'Meghal',
    'Gandhi',
    'meghal@csu.edu',
    true,
    false,
    encryption.digest('password' + salt),
    salt
  );
});