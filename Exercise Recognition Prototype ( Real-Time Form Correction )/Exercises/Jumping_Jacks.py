import mediapipe as mp
from Exercises.angle import calculate_angle

mp_pose = mp.solutions.pose

def check_jumping_jacks_form(results):
    landmarks = results.pose_landmarks
    shoulder_left = landmarks.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER]
    shoulder_right = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_SHOULDER]
    elbow_left = landmarks.landmark[mp_pose.PoseLandmark.LEFT_ELBOW]
    elbow_right = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_ELBOW]
    hip_left = landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP]
    hip_right = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HIP]
    knee_left = landmarks.landmark[mp_pose.PoseLandmark.LEFT_KNEE]
    knee_right = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_KNEE]
    ankle_left = landmarks.landmark[mp_pose.PoseLandmark.LEFT_ANKLE]
    ankle_right = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_ANKLE]

    shoulder_angle_left = calculate_angle(hip_left, shoulder_left, elbow_left)
    shoulder_angle_right = calculate_angle(hip_right, shoulder_right, elbow_right)

    leg_distance = abs(knee_left.x - knee_right.x)

    feedback = ""
    arm_angle_threshold = 150
    leg_distance_threshold = 0.1

    if shoulder_angle_left > arm_angle_threshold and shoulder_angle_right > arm_angle_threshold:
        feedback += "Raise your arms fully! "
    if leg_distance < leg_distance_threshold:
        feedback += "Jump wider with your legs! "

    if feedback == "":
        feedback = "Your jumping jack looks good!"
    return feedback
