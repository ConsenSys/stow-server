var request = require('request');
var crypto = require("crypto");

var dataHash = crypto.randomBytes(32).toString('hex')

describe("CreateRecord", () => {
  var Record = require('../../models/record');

  it("should create a record and return 200", (done) => {
    request.post({url:'http://localhost:3000/records', 
      form: {
        owner: crypto.randomBytes(32).toString('hex'),
        metadata: 'meta',
        dataHash: dataHash
      }
    }, (err, httpResponse, body) => {
      expect(httpResponse.statusCode).toEqual(200)
      done()
    })

  });

  it("should return 400, dataHash must be unique", (done) => {
    request.post({url:'http://localhost:3000/records', 
      form: {
        owner: crypto.randomBytes(32).toString('hex'),
        metadata: 'meta',
        dataHash: dataHash
      }
    }, (err, httpResponse, body) => {
      errors = JSON.parse(body).errors
      expect(errors[0]).toEqual('dataHash must be unique')
      expect(httpResponse.statusCode).toEqual(400)
      done()
    })

  });

  it("should return 400, missing owner", (done) => {
    request.post({url:'http://localhost:3000/records', 
      form: {
        metadata: 'meta',
        dataHash: crypto.randomBytes(32).toString('hex')
      }
    }, (err, httpResponse, body) => {
      errors = JSON.parse(body).errors
      expect(errors[0]).toEqual('record.owner cannot be null')
      expect(httpResponse.statusCode).toEqual(400)
      done()
    })

  });

  it("should return 400, missing metadata", (done) => {
    request.post({url:'http://localhost:3000/records', 
      form: {
        owner: crypto.randomBytes(32).toString('hex'),
        dataHash: crypto.randomBytes(32).toString('hex')
      }
    }, (err, httpResponse, body) => {
      errors = JSON.parse(body).errors
      expect(errors[0]).toEqual('record.metadata cannot be null')
      expect(httpResponse.statusCode).toEqual(400)
      done()
    })

  });

  it("should return 400, missing dataHash", (done) => {
    request.post({url:'http://localhost:3000/records', 
      form: {
        owner: crypto.randomBytes(32).toString('hex'),
        metadata: 'meta'
      }
    }, (err, httpResponse, body) => {
      errors = JSON.parse(body).errors
      expect(errors[0]).toEqual('record.dataHash cannot be null')
      expect(httpResponse.statusCode).toEqual(400)
      done()
    })

  });

});