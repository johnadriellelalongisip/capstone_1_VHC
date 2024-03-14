const crypto = require('crypto');
const keyLengthBytes = 32;
const randomKey = crypto.randomBytes(keyLengthBytes).toString('hex');
console.log(randomKey);