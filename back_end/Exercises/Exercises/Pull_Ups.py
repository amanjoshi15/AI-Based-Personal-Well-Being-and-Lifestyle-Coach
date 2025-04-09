import mediapipe as mp
from Exercises.angle import calculate_angle

mp_pose = mp.solutions.pose

count = 0
stage = ""

def get_pullup_feedback(elbow_angle_left, elbow_angle_right, shoulder_distance, hip_position, shoulder_y):
    feedback = ""
    
    if shoulder_distance < 0.1:
        feedback += "Keep your body straight! "
    if elbow_angle_left < 90 and elbow_angle_right < 90:
        feedback += "Your elbows are in the right position! "
    else:
        feedback += "Bend your elbows more to pull up! "
    if hip_position < shoulder_y:
        feedback += "Keep your hips up during the pull-up! "
    
    return feedback if feedback else "Great work! Your form looks good!"

def is_pulled_up(waist_shoulder_elbow_left, waist_shoulder_elbow_right, shoulder_elbow_wrist_left, shoulder_elbow_wrist_right):
    return (waist_shoulder_elbow_left < 90 and waist_shoulder_elbow_right < 90 and
            shoulder_elbow_wrist_left < 90 and shoulder_elbow_wrist_right < 90)

def is_hanging(wrist_elbow_shoulder_left, wrist_elbow_shoulder_right, wrist_shoulder_waist_left, wrist_shoulder_waist_right):
    return (wrist_elbow_shoulder_left > 150 and wrist_elbow_shoulder_right > 150 and
            wrist_shoulder_waist_left > 150 and wrist_shoulder_waist_right > 150)

def analyze_pullup(results):
    global count, stage
    
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
    wrist_elbow_shoulder_left = calculate_angle(wrist_left, elbow_left, shoulder_left)
    wrist_elbow_shoulder_right = calculate_angle(wrist_right, elbow_right, shoulder_right)
    wrist_shoulder_waist_left = calculate_angle(wrist_left, shoulder_left, hip_left)
    wrist_shoulder_waist_right = calculate_angle(wrist_right, shoulder_right, hip_right)
    waist_shoulder_elbow_left = calculate_angle(hip_left, shoulder_left, elbow_left)
    waist_shoulder_elbow_right = calculate_angle(hip_right, shoulder_right, elbow_right)
    shoulder_elbow_wrist_left = calculate_angle(shoulder_left, elbow_left, wrist_left)
    shoulder_elbow_wrist_right = calculate_angle(shoulder_right, elbow_right, wrist_right)
    
    shoulder_distance = abs(shoulder_left.x - shoulder_right.x)
    hip_position = (hip_left.y + hip_right.y) / 2
    shoulder_y = min(shoulder_left.y, shoulder_right.y)
    
    feedback = get_pullup_feedback(elbow_angle_left, elbow_angle_right, shoulder_distance, hip_position, shoulder_y)
    
    if is_pulled_up(waist_shoulder_elbow_left, waist_shoulder_elbow_right, shoulder_elbow_wrist_left, shoulder_elbow_wrist_right):
        stage = "up"
    elif is_hanging(wrist_elbow_shoulder_left, wrist_elbow_shoulder_right, wrist_shoulder_waist_left, wrist_shoulder_waist_right):
        if stage == "up":
            stage = "down"
            count += 1
    
    return feedback, count