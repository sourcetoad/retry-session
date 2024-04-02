import ts from 'rollup-plugin-ts';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

const name = 'RetrySession';

/**
 * ESM build (Web & node)
 *
 * @type {import('rollup').RollupOptions}
 */
const esmConfig = {
    input: 'src/index.ts',
    output: {
        file: 'dist/retry-session.js',
        format: 'esm',
        name,
        exports: 'named',
        sourcemap: false,
    },
    plugins: [
        nodeResolve(),
        ts({
            transpiler: 'typescript',
            browserslist: false,
        }),
    ],
};

/**
 * Common JS build (node)
 *
 * @type {import('rollup').RollupOptions}
 */
const commonJsConfig = {
    input: 'src/index.ts',
    output: {
        file: 'dist/common/retry-session.cjs',
        format: 'commonjs',
        name,
        exports: 'named',
        sourcemap: false,
    },
    plugins: [
        nodeResolve(),
        ts({
            transpiler: 'typescript',
            browserslist: false,
        }),
    ],
};

/**
 * UMD build for older projects
 *
 * @type {import('rollup').RollupOptions}
 */
const umdConfig = {
    input: 'src/index.umd.ts',
    output: {
        file: 'dist/umd/retry-session.js',
        format: 'umd',
        name,
        indent: true,
        extend: true,
        sourcemap: false,
        exports: 'default',
    },
    plugins: [
        nodeResolve(),
        commonjs(),
        ts({
            transpiler: {
                typescriptSyntax: 'typescript',
                otherSyntax: 'babel',
            },
            babelConfig: {
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            modules: 'umd',
                            corejs: {
                                proposals: true,
                                version: 3,
                            },
                            debug: false,
                            targets: {
                                chrome: '35',
                            },
                            useBuiltIns: 'usage',
                        },
                    ],
                ],
                plugins: [
                    '@babel/plugin-transform-template-literals',
                ],
            },
            browserslist: [ 'Chrome 35' ],
            exclude: [
                /\/core-js\//,
            ],
        }),
        terser(),
    ],
};

export default [ esmConfig, commonJsConfig, umdConfig ];
