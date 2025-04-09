import React, { useState } from "react";
import "./WorkoutLog.css";

const WorkoutLog = () => {
  const workouts = [
    { id: 1, name: "Push-Ups", sets: 3, reps: 15, completed: false },
    { id: 2, name: "Squats", sets: 4, reps: 12, completed: false },
    { id: 3, name: "Pull-Ups", sets: 3, reps: 8, completed: false },
    { id: 4, name: "Jumping Jacks", sets: 2, reps: 30, completed: false },
    { id: 5, name: "Russian Twists", sets: 3, reps: 15, completed: false }
  ];

  const [workoutList, setWorkoutList] = useState(workouts);
  const [previousLogs, setPreviousLogs] = useState(
    JSON.parse(localStorage.getItem("previousLogs")) || []
  );

  const handleExerciseClick = (id) => {
    setWorkoutList(workoutList.map(workout =>
      workout.id === id ? { ...workout, completed: !workout.completed } : workout
    ));
  };

  const saveWorkout = () => {
    const completedWorkouts = workoutList.filter((exercise) => exercise.completed);
    const newLog = {
      date: new Date().toLocaleDateString(),
      completedExercises: completedWorkouts,
    };

    const updatedLogs = [newLog, ...previousLogs].slice(0, 7);
    setPreviousLogs(updatedLogs);
    localStorage.setItem("previousLogs", JSON.stringify(updatedLogs));
  };

  return (
    <div className="workout-container">
      <h2 className="workout-title">Today's Workout Plan</h2>
      
      <div className="exercise-list">
        {workoutList.map((exercise) => (
          <div 
            key={exercise.id}
            onClick={() => handleExerciseClick(exercise.id)}
            className={`exercise-item ${exercise.completed ? 'completed' : ''}`}
          >
            <div className="exercise-content">
              <span className="exercise-name">{exercise.name}</span>
              <span className="exercise-details">
                {exercise.sets} sets ×  {exercise.reps} reps
              </span>
            </div>
          </div>
        ))}
      </div>

      <button onClick={saveWorkout} className="save-button">Save Workout</button>

      <div className="previous-section">
        <h3 className="previous-title">Previous Workout Summary</h3>
        
        <div className="previous-logs">
          {previousLogs.length > 0 ? (
            previousLogs.map((log, index) => (
              <div key={index} className="log-item">
                <div className="log-date">{log.date}</div>
                <div className="log-exercises">
                  {log.completedExercises.map(ex => 
                    `${ex.name} (${ex.sets} sets × ${ex.reps} reps)`
                  ).join(", ")}
                </div>
              </div>
            ))
          ) : (
            <div className="no-logs">No past workouts recorded.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutLog;