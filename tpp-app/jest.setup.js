jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));
jest.mock('@react-native-community/push-notification-ios', () => ({
  addNotificationRequest: jest.fn(),
  removePendingNotificationRequests: jest.fn(),
  requestPermissions: jest.fn()
})); 