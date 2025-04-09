from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
from main import estimate_pose

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/pose-correct', methods=['POST'])
def pose_correct():
    try:
        mode = request.form.get('mode')
        frame = request.files.get('frame')
        
        if frame is None:
            return jsonify(error="No file uploaded"), 400
            
        file = np.frombuffer(frame.read(), np.uint8)
        frame = cv2.imdecode(file, cv2.IMREAD_COLOR)
        
        if frame is None:
            return jsonify(error="Invalid or corrupt image file"), 400
            
        feedback, count = estimate_pose(frame, mode)
        return jsonify({"feedback":feedback, "count":count})
        
    except Exception as e:
        return jsonify(error=str(e)), 500

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5001)