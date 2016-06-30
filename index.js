const crypto = require('crypto')
const password = require('./package.json').password
const cipher = crypto.createCipher('aes192', password)
const decipher = crypto.createDecipher('aes192', password)

/**
 * Cript the information in a token
 * @param  {object} obj   the obj to encrypt in the token
 * @param  {string} pass  the password to encrypt
 * @return {string}
 */
function encrypt(obj){
  var objToCript = obj
  objToCript.timestamp = Date.now()
  objToCript.rand = Math.floor(Math.random()*1000)

  var string = JSON.stringify(obj)

  var encrypt = cipher.update(string, 'utf8', 'hex')
  encrypt += cipher.final('hex')

  return encrypt
}

/**
 * Decrypt the token to get the informations
 * @param {string} token
 * @param  {string} pass  the password to decrypt
 * @return {object} {timestamp, [keys ...]}
 */
function decrypt(token){
  var decrypt = decipher.update(token, 'hex', 'utf8')
  decrypt += decipher.final('utf8')

  var obj = JSON.parse(decrypt)

  return obj
}

module.exports = {
  encrypt,
  decrypt
}
