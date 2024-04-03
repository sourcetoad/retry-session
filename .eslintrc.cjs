/* eslint-disable @stylistic/quote-props, @stylistic/array-bracket-spacing, @stylistic/object-curly-spacing */

/** @type {import('eslint').Linter.Config} */
module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
        jest: true,
    },
    globals: {
        NodeJS: true,
    },
    extends: [
        'eslint:recommended',
    ],
    plugins: [
        '@stylistic',
        '@stylistic/ts',
        'jsdoc',
    ],
    overrides: [
        {
            files: ['*.js', '*.jsx', '*.cjs', '*.mjs'],
            parserOptions: {
                sourceType: 'module',
            },
            rules: {
                '@typescript-eslint/indent': 'off',
                '@typescript-eslint/object-curly-spacing': 'off',
                '@typescript-eslint/no-var-requires': 'off',
                '@typescript-eslint/semi': 'off',
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/space-before-function-paren': 'off',
            },
        },
        {
            files: ['*.ts', '*.tsx', '*.cts', '*.mts'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                sourceType: 'module',
                project: [
                    'tsconfig.json',
                ],
            },
            rules: {
                'no-unused-vars': 'off',
                '@typescript-eslint/triple-slash-reference': 'off',
            },
        },
    ],
    rules: {
        'prettier/prettier': 0,
        'curly': ['error', 'all'],
        'arrow-body-style': ['error', 'as-needed'],
        'eqeqeq': 'error',
        'no-console': ['error', { 'allow': [ 'warn', 'error' ] }],
        'no-unreachable-loop': 'warn',
        'no-var': 'error',
        'jsdoc/check-access': 2,
        'jsdoc/check-alignment': 2,
        'jsdoc/check-param-names': 2,
        'jsdoc/check-property-names': 2,
        'jsdoc/check-tag-names': 2,
        'jsdoc/check-values': 2,
        'jsdoc/empty-tags': 2,
        'jsdoc/implements-on-classes': 2,
        'jsdoc/multiline-blocks': 2,
        'jsdoc/no-multi-asterisks': 0,
        'jsdoc/no-undefined-types': 0,
        'jsdoc/require-jsdoc': 2,
        'jsdoc/require-param': 2,
        'jsdoc/require-param-description': 0,
        'jsdoc/require-param-name': 2,
        'jsdoc/require-property': 2,
        'jsdoc/require-property-description': 0,
        'jsdoc/require-property-name': 2,
        'jsdoc/require-returns': 2,
        'jsdoc/require-returns-check': 2,
        'jsdoc/require-returns-description': 0,
        'jsdoc/tag-lines': ['error', 'any', {
            'count': 0,
            'startLines': 1,
        }],
        '@stylistic/array-bracket-newline': ['error', 'consistent'],
        '@stylistic/array-bracket-spacing': ['error', 'always', {
            'arraysInArrays': false,
            'objectsInArrays': false,
        }],
        '@stylistic/array-element-newline': ['error', {
            ArrayExpression: 'consistent',
            ArrayPattern: {minItems: 4},
        }],
        '@stylistic/arrow-parens': ['error', 'as-needed', {
            requireForBlockBody: true,
        }],
        '@stylistic/arrow-spacing': ['error', {
            before: true,
            after: true,
        }],
        '@stylistic/block-spacing': ['error', 'always'],
        '@stylistic/brace-style': ['error', '1tbs', {allowSingleLine: false}],
        '@stylistic/comma-dangle': ['error', {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'always-multiline',
            exports: 'always-multiline',
            functions: 'only-multiline',
        }],
        '@stylistic/comma-spacing': ['error', {before: false, after: true}],
        '@stylistic/comma-style': ['error', 'last'],
        '@stylistic/computed-property-spacing': ['error', 'never'],
        '@stylistic/dot-location': ['error', 'property'],
        '@stylistic/eol-last': ['error', 'always'],
        '@stylistic/function-call-spacing': ['error', 'never'],
        '@stylistic/function-paren-newline': ['error', 'multiline-arguments'],
        '@stylistic/generator-star-spacing': ['error', {before: true, after: false}],
        '@stylistic/indent': ['warn', 4, {
            SwitchCase: 1,
        }],
        '@stylistic/key-spacing': ['error', {
            'beforeColon': false,
            'afterColon': true,
            'mode': 'strict',
        }],
        '@stylistic/keyword-spacing': ['error', {before: true, after: true}],
        '@stylistic/linebreak-style': ['error', 'unix'],
        '@stylistic/lines-between-class-members': ['error', {
            enforce: [
                {blankLine: 'always', prev: 'field', next: 'method'},
                {blankLine: 'always', prev: 'method', next: 'method'},
            ],
        }],
        '@stylistic/max-len': ['error', 120, {
            ignorePattern: '^import',
            ignoreUrls: true,
        }],
        '@stylistic/max-statements-per-line': ['error', {max: 1}],
        '@stylistic/multiline-ternary': ['error', 'always-multiline'],
        '@stylistic/new-parens': ['error', 'always'],
        '@stylistic/no-extra-semi': 'error',
        '@stylistic/no-floating-decimal': 'error',
        '@stylistic/no-mixed-spaces-and-tabs': 'error',
        '@stylistic/no-multi-spaces': 'error',
        '@stylistic/no-multiple-empty-lines': ['error', {
            max: 2,
            maxEOF: 1,
            maxBOF: 0,
        }],
        '@stylistic/no-trailing-spaces': 'error',
        '@stylistic/no-whitespace-before-property': 'error',
        '@stylistic/object-curly-newline': ['error', {consistent: true}],
        '@stylistic/object-curly-spacing': ['error', 'always', {
            'arraysInObjects': false,
            'objectsInObjects': false,
        }],
        '@stylistic/one-var-declaration-per-line': ['error', 'always'],
        '@stylistic/operator-linebreak': ['error', 'after', {
            overrides: {
                '?': 'before',
                ':': 'before',
            },
        }],
        '@stylistic/padded-blocks': ['error', 'never'],
        '@stylistic/quote-props': ['error', 'as-needed'],
        '@stylistic/quotes': ['error', 'single', {
            avoidEscape: true,
            allowTemplateLiterals: false,
        }],
        '@stylistic/rest-spread-spacing': ['error', 'never'],
        '@stylistic/semi': ['error', 'always'],
        '@stylistic/semi-spacing': ['error', {before: false, after: true}],
        '@stylistic/space-before-blocks': ['error', 'always'],
        '@stylistic/space-before-function-paren': ['error', {
            anonymous: 'never',
            named: 'never',
            asyncArrow: 'always',
        }],
        '@stylistic/space-in-parens': ['error', 'never'],
        '@stylistic/space-infix-ops': ['error', {int32Hint: true}],
        '@stylistic/space-unary-ops': ['error', {
            words: true,
            nonwords: false,
        }],
        '@stylistic/switch-colon-spacing': ['error', {after: true, before: false}],
        '@stylistic/template-curly-spacing': ['error', 'never'],
        '@stylistic/template-tag-spacing': ['error', 'never'],
        '@stylistic/wrap-iife': ['error', 'inside'],
        '@stylistic/yield-star-spacing': ['error', {before: true, after: false}],
        '@stylistic/object-property-newline': ['error', {
            allowAllPropertiesOnSameLine: true,
        }],
        '@stylistic/ts/member-delimiter-style': ['error', {
            multiline: {
                delimiter: 'comma',
                requireLast: true,
            },
            singleline: {
                delimiter: 'comma',
                requireLast: true,
            },
        }],
        '@stylistic/ts/type-annotation-spacing': ['error', {
            before: false,
            after: true,
            overrides: {
                arrow: {
                    before: true,
                    after: true,
                },
            },
        }],
    },
};
