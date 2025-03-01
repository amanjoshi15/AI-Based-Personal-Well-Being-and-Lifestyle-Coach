import mediapipe as mp
from Exercises.angle import calculate_angle

mp_pose = mp.solutions.pose

def check_squat_form(results):
    landmarks = results.pose_landmarks  
    hip_left = landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP]
    hip_right = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HIP]
    knee_left = landmarks.landmark[mp_pose.PoseLandmark.LEFT_KNEE]
    knee_right = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_KNEE]
    ankle_left = landmarks.landmark[mp_pose.PoseLandmark.LEFT_ANKLE]
    ankle_right = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_ANKLE]
    
    hip_knee_angle_left = calculate_angle(hip_left, knee_left, ankle_left)
    hip_knee_angle_right = calculate_angle(hip_right, knee_right, ankle_right)

    knee_position_left = knee_left.y
    ankle_position_left = ankle_left.y
    knee_position_right = knee_right.y
    ankle_position_right = ankle_right.y

    squat_angle_threshold = 90
    knee_over_toes_threshold = 0.1

    feedback = ""
    if hip_knee_angle_left > squat_angle_threshold or hip_knee_angle_right > squat_angle_threshold:
        feedback += "Lower your hips more! "
    if knee_position_left < ankle_position_left + knee_over_toes_threshold or knee_position_right < ankle_position_right + knee_over_toes_threshold:
        feedback += "Make sure your knees do not go beyond your toes! "
    if feedback == "":
        feedback = "Great job! Your squat form looks good! "
    return feedback