/**
 * The symptoms of each day
 */
export class Symptoms {
  constructor(flow = null, mood = null, sleep = null, cramps = null, exercise = null, notes = null, ovulating = null) {
    this.flow = flow;
    this.mood = mood;
    this.sleep = sleep;
    this.cramps = cramps;
    this.exercise = exercise;
    this.notes = notes;
    this.ovulating = ovulating; 
  }
}

/**
 * Exercise object stored in Symptoms.exercise
 */
export class ExerciseActivity {
  constructor(exercise = null, exercise_minutes = 0) {
    this.exercise = exercise;
    this.exercise_minutes = exercise_minutes;
  }
}
