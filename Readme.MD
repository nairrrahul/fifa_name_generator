A simple name generation library meant to generate 'regen' names for soccer-style management and simulation games. Currently only supports male names.

**Functions**

`generateName(nat, secondNat)` is a standalone name generation function. Primary nationality is mandatory. Secondary nationality is optional. 

Nationality must either be the full name of the nation, or the 3-letter abbreviation of the nation. `mappings.json` shows supported name-nationality pairings.

`generateNamesFromList(nationalities)` will batch-generate a list of generated names from a list of nationalities and potential second nationalities. If only a primary nationality is needed, it can be provided as a string in the input list. If a second nationality is used with the primary nationality, it must be provided as a tuple e.g. `['FRA', 'COD']` for a person with French nationality and Congolese second nationality.

**Nations Available**

All FIFA member nations are available. In addition, the following, non-FIFA member countries can be used: Kiribati, Tuvalu, Micronesia, Northern Mariana Islands, Guadeloupe, Bonaire, Martinique, Greenland, Zanzibar, Reunion, Sint Maarten

**Usage**

Package can be found here: https://www.npmjs.com/package/fifa-name-generator

and can be installed using `npm i fifa-name-generator`
