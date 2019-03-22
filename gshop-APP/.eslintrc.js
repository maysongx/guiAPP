// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  'rules': {
    "import/extensions": 0,
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'class-methods-use-this': ['warn'],
    'no-console': 'warn',
    'valid-jsdoc': 'warn',
    'require-jsdoc': 0,
    'indent': ['off', 2],
    //'vue/script-indent': ['error', 2, {'baseIndent': 1}],
    'no-return-assign': 0,
    'comma-dangle': ['error', 'only-multiline'],
    'no-unused-expressions': ['error', {'allowShortCircuit': true, 'allowTernary': true}],
    'no-param-reassign': 0,
    'no-underscore-dangle': ['error', {'allow': ['_inactive', '__wxjs_environment']}],
    'global-require': 'off',
    //禁用行尾空格
    'no-trailing-spaces': [2, {"skipBlankLines": true, "ignoreComments": true}],
    //强制在花括号中使用一致的空格
    'object-curly-spacing': 'off',
    //强制在注释中 // 或 /* 使用一致的空格
    'spaced-comment': 'off',
    //在这禁止掉console报错检查
    "no-console": "off",
    'prefer-template': 'off',
    //=>的前/后括号
    'arrow-spacing': 'off',
    //箭头函数用小括号括起来
    'arrow-parens': 'off',
    "semi": [0, "always"],//语句强制分号结尾
    "semi-spacing": [0, {"before": false, "after": false}],//分号前后空格
    'no-tabs': 'off',
    //禁止使用多个空格
    'no-multi-spaces': 'off',
    "vue/max-attributes-per-line": "off",
    "max-len": [0, 80, 4],//字符串最大长度
    'eol-last': 'off', //强制文件末尾至少保留一行空行
    'linebreak-style': 'off', //强制使用一致的换行风格
    'jsx-quotes': 'off',
    'quotes': 'off',
    "vue/name-property-casing": ["error", "PascalCase"],
    'key-spacing': 'off',
    'newline-after-import': 'off',
    'html-self-closing': 'off',
    'comma-spacing': 'off',
    //禁止出现未使用过的变量
    'no-unused-vars': 'off',
    'space-before-function-paren': 'off',//强制在 function的左括号之前使用一致的空格
  },
  overrides: [
    {
      'files': ['*.vue'],
      'rules': {
        'indent': 'off'
      }
    }
  ],
}
