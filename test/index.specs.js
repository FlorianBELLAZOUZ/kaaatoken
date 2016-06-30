var Should = require('chai').Should()
var Kaaatoken = require('..')


var token
var obj = {pseudo:'nice', id:'id'}

describe('.encrypt(obj)', function () {
  it('should return a string', function(){
    token = Kaaatoken.encrypt(obj)
    token.should.be.a('string')
    token.should.not.be.empty
    token.length.should.be.lt(200)
  })
})

describe('.decrypt(token)', function() {
  it('should return the object', function() {
    var decrypt = Kaaatoken.decrypt(token)

    decrypt.should.have.any.keys('pseudo', 'id', 'timestamp')

    decrypt.pseudo.should.be.equal(obj.pseudo)
    decrypt.id.should.be.equal(obj.id)
  })
})
