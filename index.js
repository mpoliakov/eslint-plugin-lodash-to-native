/**
 * @fileoverview Converts lodash.map function to standard Array.map if parameter is Array.
 * @author Maksim Poliakov
 */
"use strict";

const map =  require("./lib/rules/map");

// import all rules in lib/rules
module.exports.rules = {
  rules: {
    "map": map
  }
};



