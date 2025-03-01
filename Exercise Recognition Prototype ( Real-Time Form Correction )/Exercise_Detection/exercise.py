import cv2
import numpy as np
import mediapipe as mp
from angle import calculate_angle
import pickle

def calculate_shoulder_angle(shoulder, elbow, hip):
    return calculate_angle(hip, shoulder, elbow)

def calculate_elbow_angle(shoulder, elbow, wrist):
    return calculate_angle(shoulder, elbow, wrist)

def calculate_hip_angle(shoulder, hip, knee):
    return calculate_angle(shoulder, hip, knee)

def calculate_knee_angle(hip, knee, ankle):
    return calculate_angle(hip, knee, ankle)

def calculate_ankle_angle(knee, ankle, foot):
    return calculate_angle(knee, ankle, foot)

model=pickle.load(open("model.pkl","rb"))

mp_pose = mp.solutions.pose
pose = mp_pose.Pose()

cam = cv2.VideoCapture(0)

if not cam.isOpened():
    print("Error: Could not open video stream from camera.")
    exit()

while cam.isOpened():
    ret, frame = cam.read()
    if not ret:
        print("Failed to capture image.")
        break
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = pose.process(frame_rgb)
    if results.pose_landmarks:
        mp.solutions.drawing_utils.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)

        landmarks = results.pose_landmarks.landmark
        shoulder = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER]
        elbow = landmarks[mp_pose.PoseLandmark.LEFT_ELBOW]
        wrist = landmarks[mp_pose.PoseLandmark.LEFT_WRIST]
        hip = landmarks[mp_pose.PoseLandmark.LEFT_HIP]
        knee = landmarks[mp_pose.PoseLandmark.LEFT_KNEE]
        ankle = landmarks[mp_pose.PoseLandmark.LEFT_ANKLE]
        foot = landmarks[mp_pose.PoseLandmark.LEFT_FOOT_INDEX]

        features = np.array([[
            calculate_shoulder_angle(shoulder, elbow, hip),
            calculate_elbow_angle(shoulder, elbow, wrist),
            calculate_hip_angle(shoulder, hip, knee),
            calculate_knee_angle(hip, knee, ankle),
            calculate_ankle_angle(knee, ankle, foot)
        ]])

        predicted_exercise = model.predict(features)[0]
        cv2.putText(frame, f"Exercise: {predicted_exercise}", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    frame = cv2.resize(frame, None, fx=2, fy=2, interpolation=cv2.INTER_LINEAR)
    cv2.imshow('Pose Estimation', frame)

    if cv2.waitKey(1) & 0xFF == ord('s'):
        break

cam.release()
cv2.destroyAllWindows()