module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    'plugin:tailwindcss/recommended',
  ],
  plugins: ['prettier', 'tailwindcss'],

  settings: {
    tailwindcss: {
      groupByResponsive: true,
      prependCustom: true,
    },
  },

  rules: {
    'no-console': 'off',
    'import/newline-after-import': ['error', { count: 1 }],
    'vue/no-v-html': 'off',
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: false,
        ignores: ['transition', 'client-only', 'i18n', 'youtube'],
      },
    ],
    'vue/custom-event-name-casing': ['error', 'kebab-case'],
    'vue/v-on-event-hyphenation': [
      'error',
      'always',
      {
        autofix: false,
      },
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'any',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/html-comment-content-spacing': ['error', 'always'],
    'vue/padding-line-between-blocks': ['error', 'always'],
    'vue/new-line-between-multi-line-property': [
      'error',
      {
        minLineOfMultilineProperty: 2,
      },
    ],
    'vue/no-useless-v-bind': [
      'error',
      {
        ignoreIncludesComment: true,
        ignoreStringEscape: true,
      },
    ],
    'vue/v-for-delimiter-style': ['error', 'in'],
    'vue/no-empty-component-block': ['error'],
    'tailwindcss/no-custom-classname': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
        semi: false,
      },
    ],
  },
}
