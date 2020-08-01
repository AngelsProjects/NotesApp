module.exports = {
  extends: ['stylelint-config-recommended'],
  rules  : {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'extends',
          'components',
          'utilities',
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen'
        ]
      }
    ],
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity'           : null
  }
};
