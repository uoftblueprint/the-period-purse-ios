export const FLOW_LEVEL = {
  NONE: "None",
  LIGHT: "Light",
  MEDIUM: "Medium",
  HEAVY: "Heavy",
  SPOTTING: "Spotting",
};

export const MOOD_LEVEL = {
  HAPPY: "Happy",
  SAD: "Sad",
  NEUTRAL: "Neutral",
  SICK: "Sick",
  ANGRY: "Angry",
  LOL: "lol",
  IDK: "idk",
  GREAT: "Great",
  LOVED: "Loved",
};

export const CRAMP_LEVEL = {
  NEUTRAL: "Neutral",
  BAD: "Bad",
  TERRIBLE: "Terrible",
  GOOD: "Good",
  NONE: "None",
};

export const EXERCISE_TYPE = {
  CARDIO: "Cardio",
  YOGA: "Yoga",
  STRENGTH: "Strength",
  BALL_SPORT: "Ball sports",
  MARTIAL_ARTS: "Martial arts",
  WATER_SPORT: "Water sports",
  CYCLE_SPORT: "Cycle sports",
  RACKET_SPORT: "Racket sports",
  WINTER_SPORT: "Winter sports",
};

export const TRACK_SYMPTOMS = {
  FLOW: "trackFlow",
  MOOD: "trackMood",
  SLEEP: "trackSleep",
  CRAMPS: "trackCramps",
  EXERCISE: "trackExercise",
  OVULATION: "trackOvulation",
};

export const FILTER_COLOURS = {
  FLOW: {
    HEAVY: "#D42629",
    MEDIUM: "#E44545",
    LIGHT: "#E3797A",
    SPOTTING: "#FFBEBF",
    NONE: "#FFEBEB",
  },
  CRAMPS: {
    NEUTRAL: "#DFA638",
    BAD: "#DD8502",
    TERRIBLE: "#B85A04",
    GOOD: "#FFD363",
    NONE: "#FFE6A6",
  },
  EXERCISE: {
    HEAVY: "#2F5B54",
    MEDIUM: "#5A9F93",
    LIGHT: "#7BCFC0",
    LITTLE: "#B9E0D8",
  },
  SLEEP: {
    HEAVY: "#133364",
    MEDIUM: "#1A50A0",
    LIGHT: "#467CCD",
    LITTLE: "#92B8F0",
  },
  DISABLED: "#EEEEEE",
  NOFILTER: "#FFFFFF",
};

export const FILTER_TEXT_COLOURS = {
  FLOW: {
    HEAVY: "#000",
    MEDIUM: "#000",
    LIGHT: "#000",
    SPOTTING: "#000",
    NONE: "#000",
  },
  CRAMPS: {
    NEUTRAL: "#000",
    BAD: "#000",
    TERRIBLE: "#000",
    GOOD: "#000",
    NONE: "#000",
  },
  EXERCISE: {
    HEAVY: "#FFF",
    MEDIUM: "#FFF",
    LIGHT: "#FFF",
    LITTLE: "#000",
  },
  SLEEP: {
    HEAVY: "#FFF",
    MEDIUM: "#FFF",
    LIGHT: "#FFF",
    LITTLE: "#000",
  },
  DISABLED: "#AAAAAA",
  NOFILTER: "#000000",
};

export const VIEWS = {
  Flow: "Period Flow",
  Nothing: "Select",
  Mood: "Mood",
  Exercise: "Exercise",
  Cramps: "Cramps",
  Sleep: "Sleep",
  Ovulation: "Ovulation",
};

export const KEYS = {
  AVERAGE_PERIOD_LENGTH: "averagePeriodLength",
  AVERAGE_CYCLE_LENGTH: "averageCycleLength",
  INITIAL_PERIOD_LENGTH: "initialPeriodLength",
  SELECTED_YEAR: "selectedYear",
  SELECTED_MONTH: "selectedMonth",
  SELECTED_VIEW: "selectedView",
  JOINED_DATE: "joinedDate",
  AVERAGE_OVULATION_PHASE_LENGTH: "averageOvulationPhaseLength",
  AVERAGE_TIME_BETWEEN_PERIOD_AND_OVULATION:
    "averageTimeBetweenPeriodAndOvulation",
};

export const FACT_NUM = {
  FACT_CYCLE_NUM: "factCycleNumber",
};

export const REMINDERS = {
  REMIND_LOG_PERIOD: "remindLogPeriod",
  REMIND_LOG_SYMPTOMS: "remindLogSymptoms",
  LOG_PERIOD_DAYS: "remindLogPeriodDays",
  LOG_PERIOD_TIME: "remindLogPeriodTime",
  LOG_SYMPTOMS_DAYS: "remindLogSymptomsDays",
  LOG_SYMPTOMS_TIME: "remindLogSymptomsTime",
};

export const LOG_PERIOD_FREQ = {
  DAILY: "remindPeriodDaily",
  TWO: "two",
  THREE: "three",
  FIVE: "five",
  SEVEN: "seven",
};

export const LOG_SYMPTOMS_FREQ = {
  DURING_PERIOD: "remindSymptomsOnlyDuringPeriod",
  DAILY: "remindSymptomsDaily",
  TWO: "two",
  THREE: "three",
  FIVE: "five",
  SEVEN: "seven",
};

export const APPLE_CREDENTIALS = {
  USER_ID: "userId",
  IDENTITY_TOKEN: "identityToken",
  GIVEN_NAME: "givenName",
  FAMILY_NAME: "familyName",
};

export const ICLOUD = {
  BACKUP_KEY: "tpp-backup",
  LAST_SAVED_TIME: "lastSavedTime",
};

export const NOTIFICATIONS = {
  ALLOW_OVULATION_NOTIFICATIONS: "allowOvulationNotifications",
};

export const TUTORIAL_KEY = "showTutorial"; // key for backend value that returns 'true' if user needs to see tutorial
