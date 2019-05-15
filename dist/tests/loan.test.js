'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.should(); /* eslint-disable no-undef */

_chai2.default.use(_chaiHttp2.default);

describe('Loan Endpoints', function () {
  it('Should retrieve all loans', function (done) {
    _chai2.default.request(_app2.default).get('/api/loans').set('Accept', 'Application/JSON').end(function (err, res) {
      res.body.should.be.an('Object');
      res.body.should.have.property('status').equal(200);
      res.body.should.have.property('data');
      res.body.data.should.be.an('array');
      done();
    });
  });

  it('Should retrieve a specific loan', function (done) {
    _chai2.default.request(_app2.default).get('/api/loans/2').set('Accept', 'Application/JSON').end(function (err, res) {
      res.body.should.be.an('Object');
      res.body.should.have.property('status').equal(200);
      res.body.should.have.property('data');
      res.body.data.should.be.an('object');
      done();
    });
  });

  it('Should not retrieve a specific loan if a loan doesn\'t exist', function (done) {
    _chai2.default.request(_app2.default).get('/api/loans/0').set('Accept', 'Application/JSON').end(function (err, res) {
      res.body.should.be.an('Object');
      res.body.should.have.property('status').equal(404);
      res.body.should.have.property('error');
      done();
    });
  });

  it('Should not retrieve a specific loan if a loanId is not specified', function (done) {
    _chai2.default.request(_app2.default).get('/api/loans/dsss').set('Accept', 'Application/JSON').end(function (err, res) {
      res.body.should.be.an('Object');
      res.body.should.have.property('status').equal(400);
      res.body.should.have.property('error');
      done();
    });
  });

  it('Should create a loan', function (done) {
    var loan = {
      user: 'hervera@gmail.com',
      tenor: 4,
      amount: 550000
    };
    _chai2.default.request(_app2.default).post('/api/loans').send(loan).set('Accept', 'Application/JSON').end(function (err, res) {
      res.body.should.be.an('Object');
      res.body.should.have.property('status').equal(201);
      res.body.should.have.property('data');
      res.body.data.should.be.an('object');
      done();
    });
  });

  it('Should create a loan if user with this email doesn\'t exist', function (done) {
    var loan = {
      user: 'xxxxxxxx@gmail.com',
      tenor: 4,
      amount: 550000
    };
    _chai2.default.request(_app2.default).post('/api/loans').send(loan).set('Accept', 'Application/JSON').end(function (err, res) {
      res.body.should.be.an('Object');
      res.body.should.have.property('status').equal(404);
      res.body.should.have.property('error');
      done();
    });
  });

  it('Should create a loan if email is not specified in url params', function (done) {
    var loan = {
      user: 'xxxxxxxx',
      tenor: 4,
      amount: 550000
    };
    _chai2.default.request(_app2.default).post('/api/loans').send(loan).set('Accept', 'Application/JSON').end(function (err, res) {
      res.body.should.be.an('Object');
      res.body.should.have.property('status').equal(400);
      res.body.should.have.property('error');
      done();
    });
  });

  it('Should approve or reject a specific loan', function (done) {
    _chai2.default.request(_app2.default).put('/api/loans/2').set('Accept', 'Application/JSON').end(function (err, res) {
      res.body.should.be.an('Object');
      res.body.should.have.property('status').equal(200);
      res.body.should.have.property('data');
      res.body.data.should.be.an('object');
      done();
    });
  });

  it('Should not approve or reject a specific a loan if it is not found', function (done) {
    _chai2.default.request(_app2.default).put('/api/loans/0').set('Accept', 'Application/JSON').end(function (err, res) {
      res.body.should.be.an('Object');
      res.body.should.have.property('status').equal(404);
      res.body.should.have.property('error');
      done();
    });
  });

  it('Should not retrieve approve or reject a loan if the loanId is not specified', function (done) {
    _chai2.default.request(_app2.default).put('/api/loans/dsss').set('Accept', 'Application/JSON').end(function (err, res) {
      res.body.should.be.an('Object');
      res.body.should.have.property('status').equal(400);
      res.body.should.have.property('error');
      done();
    });
  });
});