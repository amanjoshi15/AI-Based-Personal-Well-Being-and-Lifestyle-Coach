import pandas as pd
import pickle

data = pd.read_csv('exercise_angles.csv')

features = data[["Shoulder_Angle", "Elbow_Angle", "Hip_Angle", "Knee_Angle", "Ankle_Angle"]]
labels = data["Label"]

from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier()
model.fit(features, labels)

pickle.dump(model,open("model.pkl","wb"))