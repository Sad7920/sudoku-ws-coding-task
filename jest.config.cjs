module.exports = {
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    moduleNameMapper: {
        '\\.css$': 'identity-obj-proxy',
        '\\.png$': '<rootDir>/__mocks__/fileMock.js',
    },
    testEnvironment: 'jsdom',
};
