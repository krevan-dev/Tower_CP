import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { accountService } from "./AccountService"
import { api } from "./AxiosService"

class AttendeesService {
  async getAttendees(eventId) {
    const res = await api.get('api/events/' + eventId + '/attendees')
    // logger.log(res.data)
    AppState.attendees = res.data
  }

  async attendEvent(accountId, eventId) {
    const res = await api.post('api/attendees', { accountId: accountId, eventId: eventId })
    // logger.log(res.data)
    AppState.attendees.push(res.data)
    AppState.myEvents.push(res.data)
  }

  async unattendEvent(accountId) {
    const res = await api.delete('api/attendees/' + accountId)
    logger.log(res.data)
    // AppState.attendees = AppState.attendees.filter(attendee => attendee.id !== accountId)
    // accountService.getAllMyEvents(accountId)
  }
}

export const attendeesService = new AttendeesService()