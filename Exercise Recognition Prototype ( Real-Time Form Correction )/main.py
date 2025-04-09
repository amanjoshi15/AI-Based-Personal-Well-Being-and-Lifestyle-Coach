import cv2
import mediapipe as mp
from Exercises.Push_Ups import check_pushup_form
from Exercises.Pull_Ups import check_pullup_form
from Exercises.Squats import check_squat_form
from Exercises.Jumping_Jacks import check_jumping_jacks_form
from Exercises.Russian_Twists import check_russian_twists_form

mp_pose = mp.solutions.pose
pose = mp_pose.Pose()

print("Select Excercise Mode:\n1. Push-ups\n2. Pull-ups\n3. Squats\n4. Jumping Jacks\n5. Russian Twists")
mode = input("Enter the Mode: ")

cam =cv2.VideoCapture(0)

while cam.isOpened():
    ret, frame = cam.read()
    if not ret:
        break
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = pose.process(frame_rgb)
    if results.pose_landmarks:
        mp.solutions.drawing_utils.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
        
        if mode == '1':
            pushup_feedback = check_pushup_form(results)
            cv2.putText(frame, pushup_feedback, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)
        elif mode == '2':
            pullup_feedback = check_pullup_form(results)
            cv2.putText(frame, pullup_feedback, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)
        elif mode == '3':
            squat_feedback = check_squat_form(results)
            cv2.putText(frame, squat_feedback, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)
        elif mode == '4':
            jumping_jacks_feedback = check_jumping_jacks_form(results)
            cv2.putText(frame, jumping_jacks_feedback, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)
        elif mode == '5':
            russian_twists_feedback = check_russian_twists_form(results)
            cv2.putText(frame, russian_twists_feedback, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)
        else:
            print("Wrong Mode Entered")
    frame = cv2.resize(frame, None, fx=2, fy=2, interpolation=cv2.INTER_LINEAR)
    cv2.imshow("Excersise Tracker", frame)
    if cv2.waitKey(1) & 0xFF == ord("s"):
        break

cam.release()
cv2.destroyAllWindows()