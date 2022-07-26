const chai = require('chai');
const assert = chai.assert;
const Translator = require('../components/translator.js');
let translator = new Translator();
function removeSpanCode(text) {
  if(text.indexOf("<") !== -1 && text.indexOf(">") !== -1) {
    const textArray = text.split("");
    const newArr = [];
    let entered = false;
    for(let i=0; i < textArray.length; i++) {
      if(textArray[i] === "<") { entered = true; }
      if(textArray[i-1] === ">") { entered = false; }
      if(entered === true) { }
      if(entered === false) { newArr.push(textArray[i]); }
    }
    return newArr.join("");
  }
  return undefined;
}
const localeToGB = "american-to-british";
const localeToUSA = "british-to-american";

suite('Unit Tests', () => {
  
  suite('Translate to British English', () => {
    
    test('#1 Translate Mangoes are my favorite fruit.', () => {
      const text = "Mangoes are my favorite fruit.";
      const input = removeSpanCode(translator.getTextTranslation(text, localeToGB));
      const expected = "Mangoes are my favourite fruit.";
      assert.strictEqual(input, expected);
      console.log(input);
    })
    test('#2 Translate I ate yogurt for breakfast.', () => {
      const text = "I ate yogurt for breakfast.";
      const input = removeSpanCode(translator.getTextTranslation(text, localeToGB));
      const expected = "I ate yoghurt for breakfast.";
      assert.strictEqual(input, expected);
      console.log(input);
    })
    test('#3 Translate We had a party at my friend\'s condo.', () => {
      const text = `We had a party at my friend's condo.`;
      const input = removeSpanCode(translator.getTextTranslation(text, localeToGB));
      const expected = "We had a party at my friend's flat.";
      assert.strictEqual(input, expected);
      console.log(input);
    })
    test('#4 Translate Can you toss this in the trashcan for me?', () => {
      const text = "Can you toss this in the trashcan for me?";
      const input = removeSpanCode(translator.getTextTranslation(text, localeToGB));
      const expected = "Can you toss this in the bin for me?";
      assert.strictEqual(input, expected);
      console.log(input);
    })
    test('#5 Translate The parking lot was full.', () => {
      const text = "The parking lot was full.";
      const input = removeSpanCode(translator.getTextTranslation(text, localeToGB));
      const expected = "The car park was full.";
      assert.strictEqual(input, expected);
      console.log(input);
    })
    test('#6 Translate Like a high tech Rube Goldberg machine.', () => {
      const text = "Like a high tech Rube Goldberg machine.";
      const input = removeSpanCode(translator.getTextTranslation(text, localeToGB));
      const expected = "Like a high tech Heath Robinson device.";
      assert.strictEqual(input, expected);
      console.log(input);
    })
    test('#7 Translate To play hooky means to skip class or work.', () => {
      const text = "To play hooky means to skip class or work.";
      const input = removeSpanCode(translator.getTextTranslation(text, localeToGB));
      const expected = "To bunk off means to skip class or work.";
      assert.strictEqual(input, expected);
      console.log(input);
    })
    test('#8 Translate No Mr. Bond, I expect you to die.', () => {
      const text = "No Mr. Bond, I expect you to die.";
      const input = removeSpanCode(translator.getTextTranslation(text, localeToGB));
      const expected = "No Mr Bond, I expect you to die.";
      assert.strictEqual(input, expected);
      console.log(input);
    })
    test('#9 Translate Dr. Grosh will see you now.', () => {
      const text = "Dr. Grosh will see you now.";
      const input = removeSpanCode(translator.getTextTranslation(text, localeToGB));
      const expected = "Dr Grosh will see you now.";
      assert.strictEqual(input, expected);
      console.log(input);
    })
    test('#10 Translate Lunch is at 12:15 today.', () => {
      const text = "Lunch is at 12:15 today.";
      const input = removeSpanCode(translator.getTextTranslation(text, localeToGB));
      const expected = "Lunch is at 12.15 today.";
      assert.strictEqual(input, expected);
      console.log(input);
    })
  })

  suite('Translate to American English', () => {
    
    test('#1 Translate We watched the footie match for a while.', () => {
      const text = "We watched the footie match for a while.";
      const input = removeSpanCode(translator.getTextTranslation(text, localeToUSA));
      const expected = "We watched the soccer match for a while.";
      assert.strictEqual(input, expected);
      console.log(input);
    })
    test('#2 Translate Paracetamol takes up to an hour to work.', () => {
      const text = "Paracetamol takes up to an hour to work.";
      const input = removeSpanCode(translator.getTextTranslation(text, localeToUSA));
      const expected = "Tylenol takes up to an hour to work.";
      assert.strictEqual(input, expected);
      console.log(input);
    })
    test('#3 Translate First, caramelise the onions.', () => {
      const text = "First, caramelise the onions.";
      const input = removeSpanCode(translator.getTextTranslation(text, localeToUSA));
      const expected = "First, caramelize the onions.";
      assert.strictEqual(input, expected);
      console.log(input);
    })
    test('#4 Translate I spent the bank holiday at the funfair.', () => {
      const text = "I spent the bank holiday at the funfair.";
      const input = removeSpanCode(translator.getTextTranslation(text, localeToUSA));
      const expected = "I spent the public holiday at the carnival.";
      assert.strictEqual(input, expected);
      console.log(input);
    })
    test('#5 Translate I had a bicky then went to the chippy.', () => {
      const text = "I had a bicky then went to the chippy.";
      const input = removeSpanCode(translator.getTextTranslation(text, localeToUSA));
      const expected = "I had a cookie then went to the fish-and-chip shop.";
      assert.strictEqual(input, expected);
      console.log(input);
    })
    test('#6 Translate I\'ve just got bits and bobs in my bum bag.', () => {
      const text = `I've just got bits and bobs in my bum bag.`;
      const input = removeSpanCode(translator.getTextTranslation(text, localeToUSA));
      const expected = "I've just got odds and ends in my fanny pack.";
      assert.strictEqual(input, expected);
      console.log(input);
    })
    test('#7 Translate The car boot sale at Boxted Airfield was called off.', () => {
      const text = "The car boot sale at Boxted Airfield was called off.";
      const input = removeSpanCode(translator.getTextTranslation(text, localeToUSA));
      const expected = "The swap meet at Boxted Airfield was called off.";
      assert.strictEqual(input, expected);
      console.log(input);
    })
    test('#8 Translate Have you met Mrs Kalyani?', () => {
      const text = "Have you met Mrs Kalyani?";
      const input = removeSpanCode(translator.getTextTranslation(text, localeToUSA));
      const expected = "Have you met Mrs. Kalyani?";
      assert.strictEqual(input, expected);
      console.log(input);
    })
    test('#9 Translate Prof Joyner of King\'s College, London.', () => {
      const text = `Prof Joyner of King's College, London.`;
      const input = removeSpanCode(translator.getTextTranslation(text, localeToUSA));
      const expected = "Prof. Joyner of King's College, London.";
      assert.strictEqual(input, expected);
      console.log(input);
    })
    test('#10 Translate Tea time is usually around 4 or 4.30.', () => {
      const text = "Tea time is usually around 4 or 4.30.";
      const input = removeSpanCode(translator.getTextTranslation(text, localeToUSA));
      const expected = "Tea time is usually around 4 or 4:30.";
      assert.strictEqual(input, expected);
      console.log(input);
    })
  })

  suite('Highlight translation', () => {
    
    test('#1 Highlight translation in Mangoes are my favorite fruit.', () => {
      const text = "Mangoes are my favorite fruit.";
      const input = translator.getTextTranslation(text, localeToGB);
      const expected = `Mangoes are my <span class="highlight">favourite</span> fruit.`;
      assert.strictEqual(input, expected);
      console.log(input);
    })
    test('#2 Highlight translation in I ate yogurt for breakfast.', () => {
      const text = "I ate yogurt for breakfast.";
      const input = translator.getTextTranslation(text, localeToGB);
      const expected = `I ate <span class="highlight">yoghurt</span> for breakfast.`;
      assert.strictEqual(input, expected);
      console.log(input);
    })
    test('#3 Highlight translation in We watched the footie match for a while.', () => {
      const text = "We watched the footie match for a while.";
      const input = translator.getTextTranslation(text, localeToUSA);
      const expected = `We watched the <span class="highlight">soccer</span> match for a while.`;
      assert.strictEqual(input, expected);
      console.log(input);
    })
    test('#4 Highlight translation in Paracetamol takes up to an hour to work.', () => {
      const text = "Paracetamol takes up to an hour to work.";
      const input = translator.getTextTranslation(text, localeToUSA);
      const expected = `<span class="highlight">Tylenol</span> takes up to an hour to work.`;
      assert.strictEqual(input, expected);
      console.log(input);
    })
  })
  
});