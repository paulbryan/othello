// Mock Expo's global imports
global.__ExpoImportMetaRegistry = {
  get: () => undefined,
  set: () => {},
};

// Mock structuredClone if not available
if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

// Suppress console warnings during tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};
