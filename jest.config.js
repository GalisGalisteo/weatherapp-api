/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  testMatch: ["**/__tests__/**/*.+(test.ts)"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  coverageDirectory: "coverage",
  coverageReporters: ["json", "lcov", "text", "clover"],
  testTimeout: 10000,
};
