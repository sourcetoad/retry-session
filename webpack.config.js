const path = require('path');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'retry-session.js',
        library: 'RetrySession',
        libraryTarget: 'umd',
        globalObject: "typeof self !== 'undefined' ? self : this",
        environment: {
            arrowFunction: false,
            bigIntLiteral: false,
            const: false,
            destructuring: false,
            dynamicImport: false,
            forOf: false,
            module: false,
        },
    },
    resolve: {
        alias: {
            '@js': path.resolve(__dirname, 'src'),
        },
    },
};
