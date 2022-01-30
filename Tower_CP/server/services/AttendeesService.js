import { BadRequest } from '@bcwdev/auth0provider/lib/Errors'
import { dbContext } from '../db/DbContext'

class AttendeesService {
  async getEventAttendees(eventId) {
    const event = await dbContext.Attendees.findById(eventId)
    if (!event) {
      throw new BadRequest('Unable to retrieve event attendees. Invalid Event Id')
    }
    return event
  }

  async attendEvent(body) {
    const attendee = await dbContext.Attendees.create(body)
    return attendee
  }

  async unattendEvent(attendeeId, eventId) {
    const attendee = await dbContext.Attendees.findById(attendeeId)
    if (!attendee) {
      throw new BadRequest('Unable to retrieve attendee. Invalid Attendee Id')
    }
    const event = await dbContext.Events.findById(eventId)
    if (!event) {
      throw new BadRequest('Unable to retrieve event. Invalid Event Id')
    }
    await attendee.remove()
    return attendee
  }
}

export const attendeesService = new AttendeesService()
