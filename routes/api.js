'use strict';
const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      console.log("//--------------------------------//")

      // get fields
      const { text, locale } = req.body;

      // error-handlers
      if(!translator.validateFields(text, locale))
        return sendResponse(translator.printError("FIELDS_MISSING"), res);
      if(!translator.validateText(text))
        return sendResponse(translator.printError("NO_TEXT"), res);
      if(!translator.validateLocale(locale))
        return sendResponse(translator.printError("INVALID_LOCALE"), res);

      // get translation
      const translation = translator.getTextTranslation(text, locale);
      
      // no translation needed
      if(translation === text) {
        const messageObj = { text: text, translation: "Everything looks good to me!" };
        return sendResponse(messageObj, res);
      }

      // translation
      const translationObj = { text: text, translation: translation };
      return sendResponse(translationObj, res);
    });
};

//----------- AUXILIARY FUNCTIONS ---------//
function sendResponse(object, res) {
  console.log(object);
  return res.json(object);
}
//----------------------------------------//