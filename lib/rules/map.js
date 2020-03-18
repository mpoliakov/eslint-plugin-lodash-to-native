"use strict";

// https://eslint.org/docs/developer-guide/working-with-rules

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Prevent using lodash.map function with arrays",
      category: "Code improvements",
      recommended: true,
    },
    fixable: "code",
    schema: []
  },
  create: function(context) {
    return {
      // https://eslint.org/docs/developer-guide/code-path-analysis

      CallExpression: function(node) {
        const callee = node.callee;
        const args = node.arguments;
        
        if (callee.object.name === "_" && callee.property.name === "map") {
          const arrArg = args[0];
          const funcArg = args[1];

          context.report({
            node: node,
            message: "Add check if the first argument is an array",
            fix: function(fixer) {
              return fixer.insertTextBefore(node, `Array.isArray(${arrArg}) ? ${arrArg}.map(${funcArg}) : `);
            }
          });
        }
      }
    };
  },
};
