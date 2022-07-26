const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const americanToBritish = Object.assign({}, americanOnly, americanToBritishSpelling, americanToBritishTitles);
const usaToGb = createMap(americanToBritish);

const britishOnly = require('./british-only.js')
const britishToAmericanSpelling = invertKeyValue(americanToBritishSpelling);
const britishToAmericanTitles = invertKeyValue(americanToBritishTitles);
const britishToAmerican = Object.assign({}, britishOnly, britishToAmericanSpelling, britishToAmericanTitles);
const gbToUsa = createMap(britishToAmerican);


class Translator {

  // error-handlers
  printError(errorType) {
    const errorObj = {};
    switch(errorType) {
      case "FIELDS_MISSING": errorObj.error = "Required field(s) missing"; break;
      case "NO_TEXT": errorObj.error = "No text to translate"; break;
      case "INVALID_LOCALE": errorObj.error = "Invalid value for locale field"; break;
      default: errorObj.error = "DEFAULT ERROR: WHAT HAPPENED HERE ?"
    }
    return errorObj;
  }
  validateFields(text, locale) {
    return (text === undefined || locale === undefined) ? false : true;
  }
  validateText(text) {
    return (text === "") ? false : true;
  }
  validateLocale(locale) {
    if(!locale) return false;
    if(locale !== USA_TO_GB && locale !== GB_TO_USA) return false;
    return true;
  }

  // translate term
  getLocaleInformation(locale) {
    if(!locale) return undefined;
    if(locale === USA_TO_GB) return { from: USA, to: GB };
    if(locale === GB_TO_USA) return { from: GB, to: USA };
    return undefined;
  }
  translateTerm(term, localeInfo) {
    if(!term || !localeInfo) return undefined;
    if(localeInfo.from === USA && localeInfo.to === GB) {
      if(isAmericanTitle(term)) return translateUsaToGbTitle(term);
      if(isAmericanTime(term)) return translateUsaToGbTime(term);
      if(isAmericanTerm(term)) return translateUsaToGbTerm(term);
    }
    if(localeInfo.from === GB && localeInfo.to === USA) {
      if(isBritishTitle(term)) return translateGbToUsaTitle(term);
      if(isBritishTime(term)) return translateGbToUsaTime(term);
      if(isBritishTerm(term)) return translateGbToUsaTerm(term);
    }
    return undefined;
  }
  insertTranslationInSpanCode(translation) {
    const spanCodeStart = `<span class="highlight">`;
    const spanCodeEnd = `</span>`;
    return (spanCodeStart + translation + spanCodeEnd);
  }
  translate(term, locale) {
    if(!term || !locale) return undefined;
    
    // localeInfo: { from, to }
    const localeInfo = this.getLocaleInformation(locale);
    if(!localeInfo) return undefined;

    // translate term
    let translation = this.translateTerm(term.toLowerCase(), localeInfo);
    if(!translation) return undefined;

    // return translation within <span> code
    return this.insertTranslationInSpanCode(translation);
  }

  // translate text sentence
  tryToFindTranslationFor(numberOfWords, textArray, translationArray, i, locale) {
    const a = textArray[i], b = textArray[i+1], c = textArray[i+2];
    const regex = /[,.!?]$/;
    let term = "";
    
    if(numberOfWords === 3) { term = a + " " + b + " " + c; }
    if(numberOfWords === 2) { term = a + " " + b; }
    if(numberOfWords === 1) { term = a; }
  
    // try to translate (with or without punctuation)
    let translation = this.translate(term, locale);
    if(translation) return translationArray.push(translation);
    else {
      
      // test if has punctuation at the end
      const charAtTheEnd = regex.test(term);
      if(charAtTheEnd) {
        
        // try to translate without last punctuation char
        let filteredTerm = popLastChar(term);
        let translation = this.translate(filteredTerm, locale);
        if(translation) {
          if(charAtTheEnd) translation += term[term.length-1];
          return translationArray.push(translation);
        }
      }
      
      // if testing 1 word and no translation
      if(numberOfWords === 1) return translationArray.push(a);
      
      // no translation
      return undefined;
    }
  }
  getTextTranslation(text, locale) {
    const textArray = ("" + text).split(" ");
    const translationArray = [];
    const length = textArray.length,
          last = length-1, lastTwo = length-2, lastThree = length-3;
    
    for(let i = 0; i < textArray.length; i++) {      
      let skipTranslation = false;

      // try to find translation for 3 words
      if(skipTranslation === false && length >= 3 && i <= lastThree) {
        const translation = this.tryToFindTranslationFor(3, textArray, translationArray, i, locale);
        if(translation) { i+=2; skipTranslation=true; }
      }
      
      // try to find translation for 2 words
      if(skipTranslation === false && length >= 2 && i <= lastTwo) {
        const translation = this.tryToFindTranslationFor(2, textArray, translationArray, i, locale);
        if(translation) { i+=1; skipTranslation=true; }
      }

      // try to find translation for 1 word
      if(skipTranslation === false && length >= 1 && i <= last) {
        const translation = this.tryToFindTranslationFor(1, textArray, translationArray, i, locale);
        if(translation) { skipTranslation=true; }
      }

      // upper case the first letter (of the first word) of the sentence
      upperCaseFirstCharOfTranslationSentenceArray(translationArray, i);
    }
    return translationArray.join(" ");
  }

}

module.exports = Translator;


//-----------------------------------------------//
//---------------- LOCALE VALUES ---------------//
const USA_TO_GB = "american-to-british";
const GB_TO_USA = "british-to-american";
//-----------------------------------------------//
//------------------ LANGUAGES -----------------//
const USA = "AMERICAN";
const GB = "BRITISH";
//---------------------------------------------//
//--------------- LANGUAGE TERM --------------//
function isAmericanTerm(term) { return !!usaToGb.get(term);}
function translateUsaToGbTerm(term) { return usaToGb.get(term); }
function isAmericanTitle(term) { return !!americanToBritishTitles[term] }
function translateUsaToGbTitle(term) {
  return usaToGb.get(term)[0].toUpperCase() + usaToGb.get(term).slice(1);
}

function isBritishTerm(term) { return !!gbToUsa.get(term); }
function translateGbToUsaTerm(term) { return gbToUsa.get(term); }
function isBritishTitle(term) { return !!britishToAmericanTitles[term] }
function translateGbToUsaTitle(term) {
  return gbToUsa.get(term)[0].toUpperCase() + gbToUsa.get(term).slice(1);
}
//---------------------------------------------//
//--------------- LANGUAGE TIME --------------//
const timeRegex = {
  time: /^[\d]*[\d][.:][\d][\d]$/i,
  american: /^[0-2]*[\d][:][0-5][\d]$/i,
  british: /^[0-2]*[\d][.][0-5][\d]$/i
}
function isTimeTerm(term) { return timeRegex.time.test(term); }
function isAmericanTime(term) { return timeRegex.american.test(term); }
function translateUsaToGbTime(term) { return term.replace(":", "."); }
function isBritishTime(term) { return timeRegex.british.test(term); }
function translateGbToUsaTime(term) { return term.replace(".", ":"); }
//--------------------------------------------------------------//
//----------------------- AUXILIARY FUNCTIONS -----------------//
function invertKeyValue(object) {
  const newObj = {};
  for(let key in object) { newObj[object[key]] = key; }
  return newObj;
}

function createMap(object) {
  return new Map(Object.entries(object));
}

function popLastChar(term) {
  const newTerm = "" + term;  
  let filteredTerm = newTerm.split("");
  filteredTerm.pop();
  filteredTerm = filteredTerm.join("");
  return filteredTerm;
}

function upperCaseFirstCharOfTranslationSentenceArray(translationArray, i) {
  // if for...loop is at first word of sentence
  if(i===0) {
    const indexOfArrow = translationArray[0].indexOf(">");
    // if first word was successfully translated it has <span> code
    if(indexOfArrow !== -1){
      translationArray[0] =
        translationArray[0].slice(0, indexOfArrow+1) + 
        translationArray[0][indexOfArrow+1].toUpperCase() +
        translationArray[0].slice(indexOfArrow+2);
    }
    // if first word was not translated
    else {
      translationArray[0] =
        translationArray[0][0].toUpperCase() +
        translationArray[0].slice(1);
    }
  }
}
//--------------------------------------------------------------//