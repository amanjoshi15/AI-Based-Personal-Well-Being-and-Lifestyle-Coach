import mediapipe as mp
from Exercises.angle import calculate_angle

mp_pose = mp.solutions.pose

def check_pullup_form(results):
    landmarks = results.pose_landmarks
    shoulder_left = landmarks.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER]
    shoulder_right = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_SHOULDER]
    elbow_left = landmarks.landmark[mp_pose.PoseLandmark.LEFT_ELBOW]
    elbow_right = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_ELBOW]
    wrist_left = landmarks.landmark[mp_pose.PoseLandmark.LEFT_WRIST]
    wrist_right = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_WRIST]
    hip_left = landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP]
    hip_right = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HIP]

    elbow_angle_left = calculate_angle(shoulder_left, elbow_left, wrist_left)
    elbow_angle_right = calculate_angle(shoulder_right, elbow_right, wrist_right)

    # shoulder_distance = abs(shoulder_left.x - shoulder_right.x)
    # hip_position = (hip_left.y + hip_right.y) / 2

    elbow_angle_threshold = 80
    # shoulder_height_threshold = 0.1

    feedback = ""
    # if shoulder_distance < shoulder_height_threshold:
    #     feedback += "Keep your body straight! "  
    if elbow_angle_left < elbow_angle_threshold and elbow_angle_right < elbow_angle_threshold:
        feedback += "Your elbows are in the right position! "
    else:
        feedback += "Bend your elbows more to pull up! "
    # if hip_position < shoulder_left.y or hip_position < shoulder_right.y:
    #     feedback += "Keep your hips up during the pull-up! "
    if feedback == "":
        feedback = "Great work! Your form looks good!"
    return feedback