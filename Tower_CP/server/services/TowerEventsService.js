import { BadRequest } from '@bcwdev/auth0provider/lib/Errors'
import { dbContext } from '../db/DbContext'

class TowerEventsService {
  async getAllEvents() {
    const events = await dbContext.Events.find().populate('creator', 'name picture')
    if (!events) {
      throw new BadRequest('No events found')
    }
    return events
  }

  async getEventById(eventId) {
    const event = await dbContext.Events.findById(eventId).populate('creator', 'name picture')
    if (!event) {
      throw new BadRequest('Invalid Event Id')
    }
    return event
  }

  async createEvent(body) {
    const event = await dbContext.Events.create(body)
    await event.populate('creator', 'name picture')
    return event
  }

  async editEvent(eventId, body) {
    const event = await dbContext.Events.findById(eventId)
    if (!event) {
      throw new BadRequest('Invalid Event Id')
    } else if (event.creatorId.toString() !== body.creatorId.toString()) {
      throw new BadRequest('You are not authorized to edit this event')
    } else if (event.cancelled) {
      throw new BadRequest('This event has been cancelled')
    }
    await event.updateOne(body)
    await event.populate('creator', 'name picture')
    return event
  }

  async deleteEvent(eventId) {
    const eventToDelete = await this.getEventById(eventId)
    if (eventToDelete.creatorId.toString() !== eventToDelete.creatorId) {
      throw new BadRequest('You are not authorized to delete this event')
    }
    eventToDelete.cancelled = true
    await eventToDelete.save()
    return eventToDelete
  }
}

export const towerEventsService = new TowerEventsService()
