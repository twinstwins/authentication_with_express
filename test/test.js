const assert = require('assert');
const expect = require('expect')
const supertest = require('supertest');
var chai = require('chai');
const app = require("../index");
var request = require('request');

describe("GET /", function() {
  it("it should return status code 200", function(done) {
    supertest(app)
      .get("/")
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});
