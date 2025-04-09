import mediapipe as mp
from Exercises.angle import calculate_angle

mp_pose = mp.solutions.pose

def check_russian_twists_form(results):
    landmarks = results.pose_landmarks
    shoulder_left = landmarks.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER]
    shoulder_right = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_SHOULDER]
    hip_left = landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP]
    hip_right = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HIP]
    knee_left = landmarks.landmark[mp_pose.PoseLandmark.LEFT_KNEE]
    knee_right = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_KNEE]

    torso_angle_left = calculate_angle(hip_left, shoulder_left, knee_left)
    torso_angle_right = calculate_angle(hip_right, shoulder_right, knee_right)

    feedback = ""
    torso_twist_threshold = 45
    
    if torso_angle_left < torso_twist_threshold or torso_angle_right < torso_twist_threshold:
        feedback += "Twist your torso more to engage the obliques! "

    if feedback == "":
        feedback = "Great job! Your Russian twists form is good!"
    return feedback
