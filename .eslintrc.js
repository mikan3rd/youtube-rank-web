const WARN = (process.env.CI == "true") ? "error" : "warn"

module.exports = {
  parser: 'babel-eslint',
  plugins:["react", "flowtype"],
  parserOptions:{
    ecmaFeatures:{
      "jsx":true,
    }
  },
  globals:{
    "google":true
  },
  rules:{
    'indent': [WARN, 2],
    'semi': [WARN, "always"],
    'comma-dangle': [WARN, "always-multiline"],
    'array-bracket-spacing': [WARN, "never"],
    'object-curly-spacing': [WARN, "never"],
    'block-spacing': WARN,
    'comma-spacing': [WARN, { "before": false, "after": true }],
    'no-extra-semi': WARN,
    'no-unexpected-multiline': WARN,
    'jsx-quotes': [WARN, "prefer-double"],
    'func-call-spacing': [WARN, "never"],
    'eol-last': [WARN, "always"],
    'keyword-spacing': [WARN, { "after": true }],
    'key-spacing': [WARN, { "beforeColon": false }],
    'space-before-blocks': WARN,
    'space-before-function-paren': [WARN, "never"],
    'space-in-parens': [WARN, "never"], // 括弧の中で最初と最後のスペースなし
    'space-infix-ops': WARN, // 二項演算子の前後にスペースを入れないことを許可しない
    'space-unary-ops': WARN, // 単項演算子の前後にスペース有無を指定する
    'arrow-spacing': WARN, // アロー関数の矢印の前後にスペースあり
    'yield-star-spacing': [WARN, "after"], // generatorの*の位置指定
    'no-useless-constructor': WARN, // 無意味なコンストラクタを非許容
    'max-len': [WARN, 120], // 1行の長さ120文字以上は警告
    'react/jsx-indent': [WARN, 2],
    'react/jsx-indent-props': [WARN, 2],
    'react/self-closing-comp': WARN,
    'react/jsx-closing-bracket-location': [WARN, "tag-aligned"],
    'react/jsx-wrap-multilines': WARN,
    'react/require-render-return': WARN,
    'react/sort-comp': WARN,
    // "sort-imports": [WARN, {
    //   "ignoreCase": false,
    //   "ignoreMemberSort": false,
    //   "memberSyntaxSortOrder": ["none", "all", "multiple", "single"]
    // }],
    "flowtype/semi": [
      WARN,
      "always",
    ],
    "flowtype/space-after-type-colon": [
      WARN,
      "always",
    ],
  }
};
