import axios from 'axios'

// Mock server backed by https://github.com/Tsukinax/events-mock (db.json).
const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/Tsukinax/events-mock',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getEvents() {
    return apiClient.get('/events')
  },
}
