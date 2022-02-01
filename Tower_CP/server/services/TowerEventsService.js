import { BadRequest, Forbidden } from '@bcwdev/auth0provider/lib/Errors'
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

  async editEvent(eventId, editedEvent) {
    const originalEvent = await this.getEventById(eventId)
    if (originalEvent.isCanceled === true) {
      throw new Forbidden('This event has already been cancelled')
    }
    if (originalEvent.creatorId.toString() !== editedEvent.creatorId) {
      throw new BadRequest('You are not authorized to edit this event')
    }
    originalEvent.name = editedEvent.name || originalEvent.name
    originalEvent.description = editedEvent.description || originalEvent.description
    originalEvent.coverImg = editedEvent.coverImg || originalEvent.coverImg
    originalEvent.location = editedEvent.location || originalEvent.location
    originalEvent.capacity = editedEvent.capacity || originalEvent.capacity
    originalEvent.startDate = editedEvent.startDate || originalEvent.startDate
    originalEvent.type = editedEvent.type || originalEvent.type
    originalEvent.save()
    return originalEvent
  }

  async cancelEvent(eventId, userId) {
    const eventToCancel = await this.getEventById(eventId)
    if (eventToCancel.creatorId.toString() !== userId && eventToCancel.isCanceled !== true) {
      throw new BadRequest('You are not authorized to delete this event')
    }
    eventToCancel.isCanceled = true
    await eventToCancel.save()
    return eventToCancel
  }
}

export const towerEventsService = new TowerEventsService()
