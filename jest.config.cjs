/**
 * @type {import("@jest/types").Config.InitialOptions}
 */
const config = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  testMatch: ['**/*.spec.ts', '**/*.spec.tsx'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  transformIgnorePatterns: ['/node_modules/'],
  transform: {
    '.+\\.tsx?$': [
      '@swc/jest',
      {
        sourceMaps: true,
        module: {
          type: 'commonjs',
        },
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
          },
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
          experimental: {
            plugins: [['jest_workaround', {}]],
          },
        },
      },
    ],
  },
};

module.exports = config;
