const crypto = require('crypto')
const password = require('./package.json').password

/**
 * Cript the information in a token
 * @param  {object} obj   the obj to encrypt in the token
 * @param  {string} pass  the password to encrypt
 * @return {string}
 */
function encrypt(obj){
  const cipher = crypto.createCipher('aes192', password)

  var objToCript = obj
  objToCript.timestamp = Date.now()
  objToCript.rand = Math.floor(Math.random()*1000)

  var string = JSON.stringify(obj)

  var encrypt = cipher.update(string, 'utf8', 'base64')
  encrypt += cipher.final('base64')

  return encrypt
}

/**
 * Decrypt the token to get the informations
 * @param {string} token
 * @param  {string} pass  the password to decrypt
 * @return {object} {timestamp, [keys ...]}
 */
function decrypt(token){
  const decipher = crypto.createDecipher('aes192', password)

  var decrypt = decipher.update(token, 'base64', 'utf8')
  decrypt += decipher.final('utf8')

  var obj = JSON.parse(decrypt)

  return obj
}

module.exports = {
  encrypt,
  decrypt
}
