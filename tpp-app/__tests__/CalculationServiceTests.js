import { calculateAverages, calculateAveragePeriodLength, calculateAverageCycleLength } from '../src/services/CalculationService';
import mockAsyncStorage from '../__mocks__/@react-native-async-storage/async-storage';
import * as helpers from "../src/services/utils/helpers";
import CycleService from "../src/services/cycle/CycleService";
import {KEYS} from "../src/services/utils/constants";

beforeEach(async () => {
    await mockAsyncStorage.clear();
});

describe ("Test Calculation Service's isPeriodStarting()", () => {
    it ("On calculate averages for one calendar, should call AsyncStorage.multiSet with expected averages 30.363636363636363 and 5.25",  async () => {
        // Mocked data
        const calendarOneHistory = [
            {
                periodDays: 5,
                start: new Date(2021, 0, 1)
            },
            { // 31 day difference
                periodDays: 5,
                start: new Date(2021, 1, 1)
            },
            { // 28 day difference
                periodDays: 5,
                start: new Date(2021, 2, 1)
            },
            { // 31 day difference
                periodDays: 6,
                start: new Date(2021, 3, 1)
            },
            { // 30 day difference
                periodDays: 6,
                start: new Date(2021, 4, 1)
            },
            { // 31 day difference
                periodDays: 4,
                start: new Date(2021, 5, 1)
            },
            { // 30 day difference
                periodDays: 6,
                start: new Date(2021, 6, 1)
            },
            { // 31 day difference
                periodDays: 5,
                start: new Date(2021, 7, 1)
            },
            { // 31 day difference
                periodDays: 6,
                start: new Date(2021, 8, 1)
            },
            { // 30 day difference
                periodDays: 5,
                start: new Date(2021, 9, 1)
            },
            { // 31 day difference
                periodDays: 6,
                start: new Date(2021, 10, 1)
            },
            { // 30 day difference
                periodDays: 4,
                start: new Date(2021, 11, 1)
            }];

        // Setup
        helpers.GETStoredYears = jest.fn().mockReturnValue( Promise.resolve (['2021', '2022']));
        jest.spyOn(CycleService, 'GETCycleHistoryByYear')
            .mockImplementationOnce( () => Promise.resolve(calendarOneHistory) );

        const spy = jest.spyOn(mockAsyncStorage, 'multiSet');

        // Act
        await calculateAverages();

        // Expect 132 and 5
        expect(spy).toHaveBeenCalledWith([
            [KEYS.AVERAGE_CYCLE_LENGTH, "30.363636363636363"],
            [KEYS.AVERAGE_PERIOD_LENGTH, "5.25"]
        ]);
    });

    it ("On calculate averages for two calendars, should call AsyncStorage.multiSet with expected averages 132 and 5",  async () => {
        // Mocked data
        const calendarOneHistory = [
            {
                periodDays: 5,
                start: new Date(2021, 0, 1)
            },
            { // 31 day difference
                periodDays: 6,
                start: new Date(2021, 1, 1)
            }];

        const calendarTwoHistory = [
            { // 334 day difference
                periodDays: 4,
                start: new Date(2022, 0, 1)
            },
            { // 31 day difference
                periodDays: 5,
                start: new Date(2022, 1, 1)
            }];

        // Setup
        helpers.GETStoredYears = jest.fn().mockReturnValue( Promise.resolve (['2021', '2022']));
        jest.spyOn(CycleService, 'GETCycleHistoryByYear')
            .mockImplementationOnce( () => Promise.resolve(calendarOneHistory) )
            .mockImplementationOnce( () => Promise.resolve(calendarTwoHistory) );

        const spy = jest.spyOn(mockAsyncStorage, 'multiSet');

        // Act
        await calculateAverages();

        // Expect 132 and 5
        expect(spy).toHaveBeenCalledWith([
            [KEYS.AVERAGE_CYCLE_LENGTH, "132"],
            [KEYS.AVERAGE_PERIOD_LENGTH, "5"]
        ]);
    });

    it ("On calculate averages for one entry only, should call AsyncStorage.multiSet with expected averages 0 and 10",  async () => {
        // Mocked data
        const singleEntryPeriodDays = 10
        const calendarOneEntryHistory = [
            {
                periodDays: singleEntryPeriodDays,
                start: new Date(2021, 0, 1)
            }
        ];

        // Setup
        helpers.GETStoredYears = jest.fn().mockReturnValue( Promise.resolve (['2020']));
        jest.spyOn(CycleService, 'GETCycleHistoryByYear')
            .mockImplementationOnce( () => Promise.resolve(calendarOneEntryHistory) );

        const spy = jest.spyOn(mockAsyncStorage, 'multiSet');

        // Act
        await calculateAverages();

        // Expect 0 and 10
        expect(spy).toHaveBeenCalledWith([
            [KEYS.AVERAGE_CYCLE_LENGTH, "0"],
            [KEYS.AVERAGE_PERIOD_LENGTH, JSON.stringify(singleEntryPeriodDays)]
        ]);
    });

    it ("On calculate averages with no history, should not throw error and set averages to 0",  async () => {
        // Mocked data
        const calendarnohistory = [];

        // Setup
        helpers.GETStoredYears = jest.fn().mockReturnValue( Promise.resolve (['2020']));
        jest.spyOn(CycleService, 'GETCycleHistoryByYear')
            .mockImplementationOnce( () => Promise.resolve(calendarnohistory) )

        const spy = jest.spyOn(mockAsyncStorage, 'multiSet');

        // Act
        await calculateAverages();

        // Expect
        expect(spy).toHaveBeenCalledWith([
            [KEYS.AVERAGE_CYCLE_LENGTH, "0"],
            [KEYS.AVERAGE_PERIOD_LENGTH, "0"]
        ]);
    });
});