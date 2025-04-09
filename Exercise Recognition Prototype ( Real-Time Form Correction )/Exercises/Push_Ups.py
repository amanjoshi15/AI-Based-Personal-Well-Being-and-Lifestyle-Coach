import mediapipe as mp
from Exercises.angle import calculate_angle

mp_pose = mp.solutions.pose

def check_pushup_form(results):
    landmarks = results.pose_landmarks
    shoulder_left = landmarks.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER]
    shoulder_right = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_SHOULDER]
    elbow_left = landmarks.landmark[mp_pose.PoseLandmark.LEFT_ELBOW]
    elbow_right = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_ELBOW]
    wrist_left = landmarks.landmark[mp_pose.PoseLandmark.LEFT_WRIST]
    wrist_right = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_WRIST]
    hip_left = landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP]
    hip_right = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HIP]

    shoulder_distance = abs(shoulder_left.x - shoulder_right.x)
    elbow_angle_left = calculate_angle(shoulder_left, elbow_left, wrist_left)
    elbow_angle_right = calculate_angle(shoulder_right, elbow_right, wrist_right)

    straight_body_threshold = 0.1
    elbow_angle_threshold = 100

    feedback = ""
    if shoulder_distance < straight_body_threshold:
        feedback += "Keep your body straight! "
    if elbow_angle_left > elbow_angle_threshold or elbow_angle_right > elbow_angle_threshold:
        feedback += "Bend your elbows more to reach 90 degrees! "
    if feedback == "":
        feedback = "Good job! Your form looks great!"
    return feedback