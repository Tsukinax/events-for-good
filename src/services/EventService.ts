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
  getEvents(perPage: number, page: number) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  getEvent(id: number) {
    return apiClient.get('/events/' + id)
  },
}
