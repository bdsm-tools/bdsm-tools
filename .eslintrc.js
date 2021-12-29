module.exports = {
    "env": {
        "browser": true,
        "es2020": true,
        "node": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:css-modules/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "css-modules"
    ],
    "rules": {
        "react/prop-types": ["off"],
        "react/no-unescaped-entities": ["off"],
        "react/display-name": ["off"],
    }
};
