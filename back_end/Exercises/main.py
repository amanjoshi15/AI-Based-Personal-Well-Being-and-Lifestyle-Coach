import cv2
import mediapipe as mp
from Exercises.Push_Ups import analyze_pushup
from Exercises.Pull_Ups import analyze_pullup
from Exercises.Squats import analyze_squats
from Exercises.Jumping_Jacks import analyze_jumping_jacks
from Exercises.Russian_Twists import analyze_russian_twists

mp_pose = mp.solutions.pose
pose = mp_pose.Pose()

def estimate_pose(frame, mode):
    feedback, count = "No pose detected", 0
    try:
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(frame_rgb)

        if results.pose_landmarks:
            if mode == 'push':
                feedback, count = analyze_pushup(results)
            elif mode == 'pull':
                feedback, count = analyze_pullup(results)
            elif mode == 'squat':
                feedback, count = analyze_squats(results)
            elif mode == 'jack':
                feedback, count = analyze_jumping_jacks(results)
            elif mode == 'twist':
                feedback, count = analyze_russian_twists(results)
            else:
                feedback = "Invalid mode specified"
    except Exception as e:
        feedback = f"Error: {str(e)}"
    return feedback, count
