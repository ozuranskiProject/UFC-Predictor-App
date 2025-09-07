module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native' +
      '|@react-native' +
      '|@react-navigation' +
      '|expo' +
      '|expo-modules-core' +
      '|expo-constants' +
      '|expo-status-bar' +
      '|expo-file-system' +
      '|expo-asset' +
      ')',
  ],
};