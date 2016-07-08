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

  context('when the object is empty', ()=>{
    var token
    it('should return a valid token', ()=>{
      token = Kaaatoken.encrypt({})

      token.should.be.not.empty
      token.should.be.a('string')
    })

    it('should return a decryptable token', ()=>{
      var obj = Kaaatoken.decrypt(token)

      obj.should.be.an('object')
      obj.should.have.any.keys('timestamp')
    })
  })

  context('when the argument is not an object', ()=>{
    [()=>{}, '', true, 10, undefined].forEach((val)=>{
      it('should return an empty string', ()=>{
        var token = Kaaatoken.encrypt(val)

        token.should.be.a('string')
        token.should.be.empty
      })
    })
  })
})

describe('.decrypt(token)', function() {
  it('should return the object', function() {
    var decrypt = Kaaatoken.decrypt(token)

    decrypt.should.have.any.keys('pseudo', 'id', 'timestamp')

    decrypt.pseudo.should.be.equal(obj.pseudo)
    decrypt.id.should.be.equal(obj.id)
  })

  context('when the token is empty', ()=>{
    it('should return a empty object', ()=>{
      var decrypt = Kaaatoken.decrypt('')
      decrypt.should.be.empty
      decrypt.should.be.an('object')
    })
  })

})
