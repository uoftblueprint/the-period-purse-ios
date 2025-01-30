import { 
  GETRemindOvulation, 
  POSTRemindOvulation, 
  GETRemindOvulationTime,
  GETRemindOvulationFreq,
  updateOvulationNotification 
} from '../src/services/SettingsService';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REMINDERS } from '../src/services/utils/constants';
import CycleService from '../src/services/cycle/CycleService';
import { addDays } from 'date-fns';

jest.mock('@react-native-community/push-notification-ios');
jest.mock('@react-native-async-storage/async-storage');
jest.mock('../src/services/cycle/CycleService');

describe('Ovulation Notification Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.clear();
  });

  describe('Notification Settings', () => {
    it('should enable ovulation notifications', async () => {
      // Setup
      AsyncStorage.setItem.mockResolvedValue(null);
      AsyncStorage.getItem
        .mockResolvedValueOnce(JSON.stringify(true))  // GETRemindOvulation
        .mockResolvedValueOnce("10:00 AM")  // Time
        .mockResolvedValueOnce("7");  // Frequency

      // Execute
      await POSTRemindOvulation(true);

      // Verify
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        REMINDERS.REMIND_OVULATION,
        JSON.stringify(true)
      );
    });

    it('should schedule notification before ovulation', async () => {
      // Setup
      const today = new Date();
      const daysUntilOvulation = 10;
      CycleService.GETPredictedDaysTillOvulation.mockResolvedValue(daysUntilOvulation);
      AsyncStorage.getItem
        .mockResolvedValueOnce("10:00 AM")  // Time
        .mockResolvedValueOnce("7");  // Notify 7 days before

      // Execute
      await updateOvulationNotification(true);

      // Verify notification was scheduled 7 days before ovulation
      expect(PushNotificationIOS.addNotificationRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          id: "remindovulation",
          title: "Ovulation Reminder",
          body: expect.stringContaining("7 days"),
          repeats: false
        })
      );
    });

    it('should disable ovulation notifications', async () => {
      // Execute
      await POSTRemindOvulation(false);

      // Verify notifications were removed
      expect(PushNotificationIOS.removePendingNotificationRequests)
        .toHaveBeenCalledWith(["remindovulation"]);
    });
  });

  describe('Notification Timing', () => {
    it('should schedule notification at correct time', async () => {
      // Setup
      AsyncStorage.getItem
        .mockResolvedValueOnce("8:00 PM")  // Time
        .mockResolvedValueOnce("5");  // Frequency
      
      CycleService.GETPredictedDaysTillOvulation.mockResolvedValue(10);

      // Execute
      await updateOvulationNotification(true);

      // Verify correct notification time (20:00)
      expect(PushNotificationIOS.addNotificationRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          fireDate: expect.stringMatching(/.*20:00:00.*/)
        })
      );
    });

    it('should handle AM/PM time conversion correctly', async () => {
      // Setup
      AsyncStorage.getItem
        .mockResolvedValueOnce("9:00 AM")  // Time
        .mockResolvedValueOnce("5");  // Frequency
      
      CycleService.GETPredictedDaysTillOvulation.mockResolvedValue(10);

      // Execute
      await updateOvulationNotification(true);

      // Verify correct notification time (09:00)
      expect(PushNotificationIOS.addNotificationRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          fireDate: expect.stringMatching(/.*09:00:00.*/)
        })
      );
    });
  });

  describe('Error Handling', () => {
    it('should handle missing ovulation prediction data', async () => {
      // Setup
      CycleService.GETPredictedDaysTillOvulation.mockResolvedValue(null);

      // Execute
      await updateOvulationNotification(true);

      // Verify no notification was scheduled
      expect(PushNotificationIOS.addNotificationRequest).not.toHaveBeenCalled();
    });

    it('should handle notification permission denial', async () => {
      // Setup
      PushNotificationIOS.requestPermissions.mockResolvedValue(false);

      // Execute
      await updateOvulationNotification(true);

      // Verify no notification was scheduled
      expect(PushNotificationIOS.addNotificationRequest).not.toHaveBeenCalled();
    });
  });
}); 