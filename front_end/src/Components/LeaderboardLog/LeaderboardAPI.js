import axios from 'axios';

const BASE_URL = 'http://localhost:5005/api/leaderboard';

export const submitScore = async (data) =>
  axios.post(`${BASE_URL}/update`, data);

export const getLeaderboard = async (exercise) =>
  axios.get(`${BASE_URL}/${exercise}`);
