const mappings = require("./mappings.json");
const namePool = require("./name_pool.json");
const doubleBarreled = require("./double_barrel.json");

// generate random name based on nationality and potential second nationality
function generateName(nationality, secNat = null) {
  var nationality = parseNationToAbbrev(nationality);
  var secondNationality = secNat == null ? secNat : parseNationToAbbrev(secNat);

  var groups = namePool[nationality];
  var secNatUse = 1;
  var flen = groups["first"].length;
  var llen = groups["last"].length;

  if (secondNationality != null) {
    secNatUse = Math.random();
  }
  
  const randFirstIndex = Math.floor(Math.random() * flen);
  var randFN = groups["first"][randFirstIndex];

  var randLN = "";
  var randBar1 = 0;

  if (secNatUse < 0.8) {
    groups = namePool[secondNationality];
    llen = groups["last"].length;

    //in addition, we want a small chance of our first name being switched
    //to that of our second nationality
    const reassignFN = Math.random();
    if(reassignFN < 0.2) {
      //groups already refers to our second nationality since we are in this block
      flen = groups["first"].length;
      randBar1 = Math.floor(Math.random() * flen);
      randFN = groups["first"][randBar1];
    }
  }

  while(randLN.length == 0 || randLN == randFN) {
    randBar1 = Math.floor(Math.random() * llen);
    randLN = groups["last"][randBar1];
  }
  secNatUse = (secondNationality != null && secNatUse > 0.8) ? 0 : 1;

  if(nationality in doubleBarreled) {
    var prob = Math.random();
    let doubBarSurname = "";
    //we use a double-barrelled surname
    if(prob < doubleBarreled[nationality]) {
      //if a second nationality-based surname was used, we have a slight chance of having
      //that surname also be used for the second portion of the double-barrelled surname
      if(secNatUse == 0 && prob < 0.2) {
        var randBar2 = Math.floor(Math.random() * namePool[secondNationality]["last"].length);
        doubBarSurname = namePool[secondNationality]["last"][randBar2];
      }
      //else we use the second part from the primary surname
      else {
        var randBar2 = Math.floor(Math.random() * llen);
        if(randBar2 == randBar1) {
          randBar2 = (randBar2 + 1) % llen;
        }
        doubBarSurname =  namePool[nationality]["last"][randBar2];
      }

      //now that we have the double-barrelled portion, we have a 50/50 chance of swapping
      //the names around
      prob = Math.random();
      randLN = prob > 0.5 ? randLN + "-" + doubBarSurname : doubBarSurname + "-" + randLN;

    }
  }

  return randFN + " " + randLN;
}

function generateNamesFromList(nationalities) {
  return nationalities.map(nationValue => {
    if(Array.isArray(nationValue) && nationValue.length == 2) {
      return generateName(nationValue[0], nationValue[1]);
    } else if (typeof nationValue == 'string') {
      return generateName(nationValue);
    } else {
      throw new Error(`Invalid Nationality List Format with ${nationValue}`);
    }
  });
}

function parseNationToAbbrev(nation) {
  if(nation.length < 3) {
    throw new Error(`Invalid Nationality Abbreviation Length for ${nation}`);
  } else if(nation.length == 3) {
    return nation in namePool ? nation : (() => {throw new Error(`Invalid Nation Abbreviation ${nation}`)})();
  } else {
    return nation in mappings ? mappings[nation] : (() => {throw new Error(`Invalid Nation Name ${nation}`)})();
  }
}

module.exports = {
  generateName,
  generateNamesFromList
};