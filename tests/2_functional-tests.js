const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');
chai.use(chaiHttp);
//let Translator = require('../components/translator.js');
//let translator = new Translator();
const translateApiRoute = "/api/translate";
const textAmerican = "Mangoes are my favorite fruit.";
//const textBritish = "We watched the footie match for a while.";
const localeToGB = "american-to-british";
const localeToUSA = "british-to-american";


suite('Functional Tests', () => {

  suite('POST /api/translate', () => {
    test('#1 Translation with text and locale fields', (done) => {
      const sendObj = { text: textAmerican, locale: localeToGB };
      chai
        .request(server)
        .post(translateApiRoute)
        .type("form")
        .send(sendObj)
        .end((err, res) => {
          if(err) return console.error(err);
          assert.equal(res.status, 200);
          assert.property(res.body, "text", "body response object must have a property named text");
          assert.property(res.body, "translation", "body response object must have a property named translation");
          assert.equal(res.body.translation, `Mangoes are my <span class="highlight">favourite</span> fruit.`)
          done();
        })
    });
    test('#2 Translation with text and invalid locale field', (done) => {
      const sendObj = { text: textAmerican, locale: "portuguese-to-british" };
      const expectedErrorMessage = "Invalid value for locale field";
      chai
        .request(server)
        .post(translateApiRoute)
        .type("form")
        .send(sendObj)
        .end((err, res) => {
          if(err) return console.error(err);
          assert.equal(res.status, 200);
          assert.property(res.body, "error", "body response object must have a property named error");
          assert.equal(res.body.error, expectedErrorMessage);    
          done();
        })
      //testErrorCase(sendObj, expectedErrorMessage, done);
    });
    test('#3 Translation with missing text field', (done) => {
      const sendObj = { locale: localeToUSA };
      const expectedErrorMessage = "Required field(s) missing";
      chai
        .request(server)
        .post(translateApiRoute)
        .type("form")
        .send(sendObj)
        .end((err, res) => {
          if(err) return console.error(err);
          assert.equal(res.status, 200);
          assert.property(res.body, "error", "body response object must have a property named error");
          assert.equal(res.body.error, expectedErrorMessage);    
          done();
        })
      //testErrorCase(sendObj, expectedErrorMessage, done);
    });
    test('#4 Translation with missing locale field', (done) => {
      const sendObj = { text: textAmerican };
      const expectedErrorMessage = "Required field(s) missing";
      chai
        .request(server)
        .post(translateApiRoute)
        .type("form")
        .send(sendObj)
        .end((err, res) => {
          if(err) return console.error(err);
          assert.equal(res.status, 200);
          assert.property(res.body, "error", "body response object must have a property named error");
          assert.equal(res.body.error, expectedErrorMessage);    
          done();
        })
      //testErrorCase(sendObj, expectedErrorMessage, done);
    });
    test('#5 Translation with empty text', (done) => {
      const sendObj = { text: "", locale: localeToUSA };
      const expectedErrorMessage = "No text to translate";
      chai
        .request(server)
        .post(translateApiRoute)
        .type("form")
        .send(sendObj)
        .end((err, res) => {
          if(err) return console.error(err);
          assert.equal(res.status, 200);
          assert.property(res.body, "error", "body response object must have a property named error");
          assert.equal(res.body.error, expectedErrorMessage);    
          done();
        })
      //testErrorCase(sendObj, expectedErrorMessage, done);
    });
    test('#6 Translation with text that needs no translation', (done) => {
      const sendObj = { text: textAmerican, locale: localeToUSA };
      chai
        .request(server)
        .post(translateApiRoute)
        .type("form")
        .send(sendObj)
        .end((err, res) => {
          if(err) return console.error(err);
          assert.equal(res.status, 200);
          assert.property(res.body, "text", "body response object must have a property named text");
          assert.property(res.body, "translation", "body response object must have a property named translation");              assert.equal(res.body.translation, "Everything looks good to me!")
          done();
        })
    })
  });
  
});
