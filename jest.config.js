module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/projects/ngx-mdx/setup-jest.ts'],
  globals: {
    stringifyContentPathRegex: '\\.html$',
  },
  moduleNameMapper: {
    '^@lib/(.*)$': '<rootDir>/projects/ngx-mdx/src/lib/$1',
  },
  testMatch: ['<rootDir>/projects/ngx-mdx/**/*.spec.ts'],
  coverageDirectory: '<rootDir>/coverage/ngx-mdx',
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  transform: {
    '^.+\\.(ts|js|html)$': [
      'jest-preset-angular',
      { stringifyContentPathRegex: '\\.html$' }
    ],
  },
  testEnvironment: 'jsdom',
};
