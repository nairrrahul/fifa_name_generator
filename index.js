const mappings = require("./mappings.json");
const namePool = require("./name_pool.json");
const doubleBarreled = require("./double_barrel.json");

// generate random name based on nationality and potential second nationality
function generateName(nationality, secNat = null) {
  var nationality = parseNationToAbbrev(nationality);
  var secondNationality = secNat == null ? secNat : parseNationToAbbrev(secNat);

  var groups = namePool[nationality];
  var secNatUse = 1;
  const flen = groups["first"].length;
  var llen = groups["last"].length;

  if (secondNationality != null) {
    secNatUse = Math.random();
  }
  
  const randFirstIndex = Math.floor(Math.random() * flen);
  const randFN = groups["first"][randFirstIndex];

  var randLN = "";
  var randBar1 = 0;

  if (secNatUse < 0.8) {
    groups = namePool[secondNationality];
    llen = groups["last"].length;
  }

  while(randLN.length == 0 || randLN == randFN) {
    randBar1 = Math.floor(Math.random() * llen);
    randLN = groups["last"][randBar1];
  }
  secNatUse = (secondNationality != null && secNatUse > 0.8) ? 0 : 1;

  if(nationality in doubleBarreled) {
    var prob = Math.random();
    if(prob < doubleBarreled[nationality]) {
      if(secNatUse < 0.8) {
        var randBar2 = Math.floor(Math.random() * namePool[secondNationality]["last"].length);
        randLN += "-" + namePool[secondNationality]["last"][randBar2];
      }
      else {
        var randBar2 = Math.floor(Math.random() * llen);
        if(randBar2 == randBar1) {
          randBar2 = (randBar2 + 1) % llen;
        }
        randLN += "-" + groups["last"][randBar2];
      }
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
