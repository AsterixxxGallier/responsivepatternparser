/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ["ts", "js"],
    moduleNameMapper: {
        '^@App/(.*)$': '<rootDir>/src/$1',
        '^lib/(.*)$': '<rootDir>/common/$1',
    },
};