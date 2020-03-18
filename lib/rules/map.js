"use strict";

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Prevent using lodash.map function with arrays",
      category: "Code improvements",
    },
    fixable: "code",
    schema: []
  },
  create: (context) => {
    const sourceCode = context.getSourceCode();

    const hasIsArrayCheck = (node, collection) => {
      const parent = node.parent;

      if (parent.type !== "ConditionalExpression") {
        return false;
      }

      if (parent.test.type !== "CallExpression") {
        return false;
      }

      const callee = parent.test.callee;

      if (!callee.object || !callee.property) {
        return;
      }

      return callee.object.name === "Array"
        && callee.property.name === "isArray"
        && sourceCode.getText(parent.test.arguments[0]) === sourceCode.getText(collection);
    };

    return {
      CallExpression: (node) => {
        const callee = node.callee;

        if (callee.type !== "MemberExpression") {
          return;
        }

        if (!callee.object || !callee.property) {
          return;
        }

        if (callee.object.name === "_" && callee.property.name === "map") {
          const colArg = node.arguments[0];
          const funcArg = node.arguments[1];

          const colSourceCode = sourceCode.getText(colArg);
          const funcSourceCode = sourceCode.getText(funcArg);

          if (colArg.type === "ArrayExpression") {
            context.report({
              node: node,
              message: "Replace with native map function",
              fix: (fixer) => {
                return fixer.replaceText(node, `${colSourceCode}.map(${funcSourceCode})`);
              }
            });

            return;
          }

          if (hasIsArrayCheck(node, colArg)) {
            return;
          }

          context.report({
            node: node,
            message: "Add check if the first argument is an array",
            fix: (fixer) => {
              return fixer.insertTextBefore(node, `Array.isArray(${colSourceCode}) ? ${colSourceCode}.map(${funcSourceCode}) : `);
            }
          });
        }
      }
    };
  }
};
