import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class EventsService {
  async getAllEvents(query = '') {
    const res = await api.get('api/events' + query)
    // logger.log(res.data)
    AppState.events = res.data
  }

  async getEventById(eventId) {
    const res = await api.get('api/events/' + eventId)
    // logger.log(res.data)
    AppState.activeEvent = res.data
  }

  async createEvent(event) {
    const res = await api.post('api/events', event)
    // logger.log(res.data)
    AppState.events.push(res.data)
    AppState.activeEvent = res.data
  }

  async cancelEvent() {
    await api.delete('api/events/' + AppState.activeEvent.id)
    // logger.log(res.data)
  }
}



export const eventsService = new EventsService()