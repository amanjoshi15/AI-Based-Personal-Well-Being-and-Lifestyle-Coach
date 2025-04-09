import React, { useState, useRef, useEffect } from 'react';
import PushUpsVideo from './Demo_Videos/Push-Ups.mp4';
import PullUpsVideo from './Demo_Videos/Pull-Ups.mp4';
import SquatsVideo from './Demo_Videos/Squats.mp4';
import JumpingJacksVideo from './Demo_Videos/Jumping-Jacks.mp4';
import RussianTwistsVideo from './Demo_Videos/Russian-Twists.mp4';
import { useNavigate } from 'react-router-dom';
import './style.css';


const Style1 = {
  border: '2px groove rgb(115, 186, 116)',
  padding: '20px',
  borderRadius: '8px',
  marginBottom: '20px',
  textAlign: 'center',
  backgroundColor: '#41ad4ef5',
};

const Style2 = {
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
};

const Style3 = {
  position: 'relative',
  width: '350px',
  height: '197px',
  borderRadius: '20px',
};

const demoVideoStyle = {
  position: 'relative',
  width: '350px',
  height: '200px',
};

const ExerciseFeed = () => {
  const videoRef = useRef(null);
  const [mode, setMode] = useState('squat');
  const [feedback, setFeedback] = useState('');
  const [count, setCount] = useState();
  const navigate = useNavigate();

  const HandleExerciseChange = (e) => setMode(e.target.value);

  const handleSubmitToLeaderboard = () => {
    if (!mode || !count) {
      alert("Please perform an exercise to generate a count.");
      return;
    }

    const exerciseNames = {
      'push': "Push-Ups",
      'pull': "Pull-Ups",
      'squat': "Squats",
      'jack': "Jumping Jacks",
      'twist': "Russian Twists"
    };

    // Remove hardcoded values
    navigate('/leaderboard', {
      state: {
        exercise: exerciseNames[mode],
        reps: count
      }
    });
  };

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (e) {
        console.error('Error accessing the camera:', e);
        alert('Please allow camera access for the application to work.');
      }
    };
    startCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (videoRef.current) {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const frame = canvas.toDataURL('image/jpeg');

        const frameBlob = dataURItoBlob(frame)
        const formData = new FormData();
        formData.append('frame', frameBlob);
        formData.append('mode', mode);


        const response = await fetch('http://localhost:5001/pose-correct', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        console.log(data);
        setFeedback(data["feedback"] || "Data not found");
        setCount(data["count"] || 0);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [mode]);

  const getDemoVideoSrc = () => {
    switch (mode) {
      case 'push':
        return PushUpsVideo;
      case 'pull':
        return PullUpsVideo;
      case 'squat':
        return SquatsVideo;
      case 'jack':
        return JumpingJacksVideo;
      case 'twist':
        return RussianTwistsVideo;
      default:
        return '';
    }
  };

  return (
    <div style={Style1}>
      <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: '"Itim", cursive', color: 'white', fontSize: '40px' }}>
        Live Exercise Feed
      </h2>
      <label htmlFor="exercise-select" style={{ color: 'white', fontFamily: '"Host Grotesk", serif' }} >Select Exercise: </label>
      <select id="exercise-select" value={mode} onChange={HandleExerciseChange}>
        <option value="">--Choose an Exercise--</option>
        <option value="push">Push-Ups</option>
        <option value="pull">Pull-Ups</option>
        <option value="squat">Squats</option>
        <option value="jack">Jumping Jacks</option>
        <option value="twist">Russian Twists</option>
      </select>
      <br />
      <br />
      <div style={Style2}>
        <video ref={videoRef} autoPlay style={Style3} />
        {mode && <video src={getDemoVideoSrc()} style={demoVideoStyle} autoPlay loop muted />}
      </div>
      <br />
      <div className="feedback">
        <h3 style={{ color: 'white', fontFamily: '"Host Grotesk", serif' }} >Feedback:</h3>
        <p style={{ color: 'white',fontFamily: '"Gurajada", sans-serif', fontSize: '25px' }}>{feedback}</p>
      </div>
      <div className="feedback">
        <h3 style={{ color: 'white', fontFamily: '"Host Grotesk", serif' }} >Count:</h3>
        <p style={{ color: 'white',fontFamily: '"Gurajada", sans-serif', fontSize: '25px' }}>{count}</p>
      </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={handleSubmitToLeaderboard}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: 'darkgreen',
            color: 'white',
            border: 'none',
            fontFamily: '"Host Grotesk", serif',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Submit to Leaderboard
        </button>
      </div>
    </div>
  );
};

function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}


export default ExerciseFeed;
