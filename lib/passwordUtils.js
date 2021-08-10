const crypto = require('crypto');

function genPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex'); // 1000 iteration, 64 bit hash, using sha512
    //pbkdf2 is pretty famous for password and encryption
    return {
      salt: salt,
      hash: genHash
    };
}

function validPassword(password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
} // salt and hash we are getting from database of that user

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;