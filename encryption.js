"use strict"

// A randomly-generated secret string
const secret = '(dhoni*brady*raina+csk+blue)'
// The algorithm to use in cyphering
const algorithm = 'aes-256-ctr'

const crypto = require('crypto');

class Encryption {

  // Creates a random value for use as salt
  salt() {
    return crypto.randomBytes(32).toString('hex').slice(0,32);
  }

  // Creates a cryptographic hash of the provided
  // plaintext, with additional salt using a module
  // specific secret
  digest(plaintext) {
    const hash = crypto.createHash('sha256');
    hash.update(plaintext);
    hash.update(secret);
    return hash.digest('hex');
  }

  encipher(plaintext) {
    const cipher = crypto.createCipher(algorithm, secret);
    var encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  decipher(crypttext) {
    const decipher = crypto.createCipher(algorithm, secret);
    var deciphered = decipher.update(crypttext, 'hex', 'utf8');
    deciphered += decipher.final('utf8');
    return deciphered;
  }

}

module.exports = exports = new Encryption();