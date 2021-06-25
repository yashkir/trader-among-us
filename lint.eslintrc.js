module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12
  },
  "settings": {
    "react": {
      "version": "17"
    }
  },
  "plugins": [
    "react"
  ],
  "ignorePatterns": ["build/*"],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react-hooks/exhaustive-deps": "off",
    "semi": 1,
    "quotes": [
      1,
      "double"
    ]
  }
};
