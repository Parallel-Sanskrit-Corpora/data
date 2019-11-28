module.exports = {
    extends: [
        'airbnb-base/legacy',
        'plugin:angular/johnpapa'
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "modules": true
        }
    },
    env: {
        browser: true,
        es6: true,
        node: true,
        jasmine: true
    },
    globals: {
        _: true,
        angular: true,
        firebase: true,
        GridStackUI: true,
        inject: true,
        math: true,
        moment: true,
        Promise: true,
        LE: true
    },
    rules: {
        'angular/file-name': 0,
        'angular/no-run-logic': 0,
        'angular/window-service': 0,
        'angular/function-type': [0, "named"],
        'func-names': 0,
        'max-len': ['error', 140, 2, {
            ignoreUrls: true,
            ignoreComments: false,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true
        }],
        'no-console': 0,
        'no-alert': 0,
        'no-restricted-syntax': 0,
        'no-loop-func': 0,
        'no-use-before-define': 0,
        'no-var': 0,
        'object-shorthand': 0,
        'prefer-arrow-callback': 0,
        'vars-on-top': 0,
        'no-param-reassign': 0,
        'global-require': 0,
        'wrap-iife': 0
    }
};
