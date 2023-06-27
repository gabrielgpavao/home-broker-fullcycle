module.exports = {
	'env': {
		'node': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended'
	],
	'overrides': [
		{
			'env': {
				'node': true
			},
			'files': [
				'.eslintrc.{js,cjs}'
			],
			'parserOptions': {
				'sourceType': 'script'
			}
		}
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [
		'@typescript-eslint'
	],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'no-undef': 'off',
		'eol-last': [
			'error',
			'always'
		],
		'no-trailing-spaces': 'error',
		'comma-dangle': [
			'error', 'never'
		],
		'comma-spacing': [
			'error',
			{
				'before': false,
				'after': true
			}
		],
		'no-multi-spaces': 'error'
	}
}
