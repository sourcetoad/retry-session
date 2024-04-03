module.exports = {
    clearMocks: true,
    coverageProvider: 'v8',
    moduleFileExtensions: [
        'js',
        'jsx',
        'ts',
        'tsx',
        'json',
        'cjs',
        'mjs',
    ],
    moduleNameMapper: {
        '^@js/(.*)$': '<rootDir>/src/$1',
    },
    modulePathIgnorePatterns: [ 'dist/*' ],
    preset: 'ts-jest',
    rootDir: '.',
    transform: { '^.+\\.ts?$': 'ts-jest' },
};
