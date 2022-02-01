import { BadRequest } from '@bcwdev/auth0provider/lib/Errors'
import { dbContext } from '../db/DbContext'

class AttendeesService {
  async getEventAttendees(eventId) {
    const event = await dbContext.Attendees.find({ eventId }).populate('account')
    if (!event) {
      throw new BadRequest('Unable to retrieve event attendees. Invalid Event Id')
    }
    return event
  }

  async attendEvent(body, eventId) {
    const attendee = await dbContext.Attendees.create(body)
    const event = await dbContext.Events.findById(eventId)
    if (event.capacity <= 0) {
      throw new BadRequest('There are no more seats available')
    }
    await attendee.populate('account')
    await attendee.populate('event')
    event.capacity--
    event.save()
    return attendee
  }

  // NOTE remember to findByIdAndDelete the attendeeId and not the userId
  async removeAttend(id, userId) {
    const attendee = await dbContext.Attendees.findById(id)
    const event = await dbContext.Events.findById(attendee.eventId)
    if (attendee.accountId.toString() !== userId) {
      throw new BadRequest('You are unable to do that')
    }
    await dbContext.Attendees.findByIdAndDelete(id)
    event.capacity++
    event.save()
  }

  async getMyAttending(userId) {
    const attending = await dbContext.Attendees.find({ accountId: userId }).populate('event')
    return attending
  }
}

export const attendeesService = new AttendeesService()
