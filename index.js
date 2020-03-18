/**
 * @fileoverview Converts lodash.map function to standard Array.map if parameter is Array.
 * @author Maksim Poliakov
 */
"use strict";

const map =  require("./lib/rules/map");

module.exports = {
  rules: {
    "map": map
  }
};
