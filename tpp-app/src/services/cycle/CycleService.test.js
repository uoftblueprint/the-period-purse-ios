
import CycleService from './CycleService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCalendarByYear, getSymptomsFromCalendar, getDaysDiffInclusive, getPeriodsInYear } from '../utils/helpers';
import { differenceInDays, addDays } from 'date-fns';

// Mock dependencies
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

jest.mock('../utils/helpers', () => ({
  getCalendarByYear: jest.fn(),
  getSymptomsFromCalendar: jest.fn(),
  getDaysDiffInclusive: jest.fn(),
  getPeriodsInYear: jest.fn(),
}));

jest.mock('date-fns', () => ({
  differenceInDays: jest.fn(),
  addDays: jest.fn(),
}));

describe('CycleService.GETPredictedDaysTillOvulation', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return calculated days until ovulation based on average difference', async () => {
    // Mock data
    const lastPeriodStart = new Date('2023-08-01');
    const today = new Date('2023-08-10');
    const averageCycleLength = 28;
    const averagePeriodLength = 5;
    const difference = averageCycleLength - averagePeriodLength; // 23

    // Mock functions
    CycleService.GETMostRecentPeriodStartDate = jest.fn().mockResolvedValue(lastPeriodStart);
    CycleService.GETAverageCycleLength = jest.fn().mockResolvedValue(averageCycleLength);
    CycleService.GETAveragePeriodLength = jest.fn().mockResolvedValue(averagePeriodLength);
    addDays.mockImplementation((date, days) => new Date(date.getTime() + days * 86400000));
    differenceInDays.mockImplementation((date1, date2) => {
      const diffTime = date1 - date2;
      return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    });

    // Execute function
    const result = await CycleService.GETPredictedDaysTillOvulation();

    // Assertions
    expect(CycleService.GETMostRecentPeriodStartDate).toHaveBeenCalled();
    expect(CycleService.GETAverageCycleLength).toHaveBeenCalled();
    expect(CycleService.GETAveragePeriodLength).toHaveBeenCalled();
    expect(addDays).toHaveBeenCalledWith(lastPeriodStart, difference);
    expect(differenceInDays).toHaveBeenCalledWith(addDays(lastPeriodStart, difference), today);
    expect(result).toBe(difference);
  });

  it('should default to 14 days when insufficient user data is available', async () => {
    // Mock data
    const lastPeriodStart = new Date('2023-08-01');
    const today = new Date('2023-08-10');
    const defaultDifference = 14;

    // Mock functions
    CycleService.GETMostRecentPeriodStartDate = jest.fn().mockResolvedValue(lastPeriodStart);
    CycleService.GETAverageCycleLength = jest.fn().mockResolvedValue(null);
    CycleService.GETAveragePeriodLength = jest.fn().mockResolvedValue(null);
    addDays.mockImplementation((date, days) => new Date(date.getTime() + days * 86400000));
    differenceInDays.mockImplementation((date1, date2) => {
      const diffTime = date1 - date2;
      return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    });

    // Execute function
    const result = await CycleService.GETPredictedDaysTillOvulation();

    // Assertions
    expect(CycleService.GETMostRecentPeriodStartDate).toHaveBeenCalled();
    expect(CycleService.GETAverageCycleLength).toHaveBeenCalled();
    expect(CycleService.GETAveragePeriodLength).toHaveBeenCalled();
    expect(addDays).toHaveBeenCalledWith(lastPeriodStart, defaultDifference);
    expect(differenceInDays).toHaveBeenCalledWith(addDays(lastPeriodStart, defaultDifference), today);
    expect(result).toBe(defaultDifference);
  });
});