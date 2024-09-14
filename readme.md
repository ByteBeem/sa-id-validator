# SA-ID Validator

A simple module to validate South African ID numbers and extract useful information such as date of birth, age, gender, citizenship, and race.

## Installation

Install the package via NPM:

```bash
npm install @bytebeem/sa-id-validator

Usage

You can use the package to validate a South African ID number and retrieve details like date of birth, gender, citizenship, and race.

 Example:

 const idValidationService = require('@bytebeem/sa-id-validator');

const id = '1234567891011';  
const result = idValidationService.checkNumber(id);

console.log(result);


OUTPUT:

{
  "dob": "1901-01-23T00:00:00.000Z",
  "age": 123,
  "gender": "Male",
  "citizenship": "SA Citizen",
  "race": null,
  "error": null,
  "isValid": true
}
