"user strict";

const rule = require("../../../lib/rules/map");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();

ruleTester.run("map", rule, {
  valid: [
    "Array.isArray(arr) ? arr.map((i) => i * 2) : _.map(arr, (i) => i * 2)"
  ],
  invalid: [
    {
      code: "_.map(arr, (i) => i * 2)",
      errors: [{
        message: "Add check if the first argument is an array",
        type: "CallExpression"
      }]
    }
  ]
});