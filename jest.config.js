module.exports = {
  preset: 'ts-jest',

  testEnvironment: 'node',

  setupFiles: ['<rootDir>/configs/enzyme.config.ts'],

  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],

  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },

  globals: {
    "ts-jest": {
      "tsConfig": "<rootDir>/jest.tsconfig.json",
      diagnostics: true,
    }
  },

  testURL: 'http://localhost',

  snapshotSerializers: ["enzyme-to-json/serializer"],

  verbose: true,

  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__mocks__/files.ts',
    '^components(.*)$': '<rootDir>/src/components$1',
    '^container(.*)$': '<rootDir>/src/container$1',
    '^routes(.*)$': '<rootDir>/src/routes$1',
    '^store(.*)$': '<rootDir>/src/store$1',
    '^public(.*)$': '<rootDir>/public$1',
    '^types(.*)$': '<rootDir>/src/types$1',
    '^utils(.*)$': '<rootDir>/src/utils$1',
    '^modals(.*)$': '<rootDir>/src/modals$1',
    '^api(.*)$': '<rootDir>/src/api$1',
    '^img(.*)$': '<rootDir>/src/img$1',
    '^constatns(.*)$': '<rootDir>/src/constants$1',
    '^hooks(.*)$': '<rootDir>/src/hooks$1',
    '^context(.*)$': '<rootDir>/src/context$1',
    '^constants(.*)$': '<rootDir>/src/constants$1',
  }
};