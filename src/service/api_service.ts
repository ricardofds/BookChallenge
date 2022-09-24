import axios from 'axios';

export const GOOGLE_KEY = '';

export const GoogleService = axios.create({
  baseURL: 'https://www.googleapis.com',
});
