import { BadRequest } from '@bcwdev/auth0provider/lib/Errors'
import { dbContext } from '../db/DbContext'

class TowerEventsService {
  async getAllEvents() {
    const events = await dbContext.TowerEvent.find().populate('creator', 'name picture')
    if (!events) {
      throw new BadRequest('No events found')
    }
    return events
  }

  async getEventById(eventId) {
    const event = await dbContext.TowerEvent.findById(eventId).populate('creator', 'name picture')
    if (!event) {
      throw new BadRequest('Invalid Event Id')
    }
    return event
  }

  async createEvent(body) {
    const event = await dbContext.TowerEvent.create(body)
    await event.populate('creator', 'name picture')
    return event
  }

  async editEvent(eventId, editedBody) {
    const eventToEdit = await this.getEventById(eventId)
    if (eventToEdit.creatorId.toString() !== editedBody.creatorId) {
      throw new BadRequest('You are not authorized to edit this event')
    }
    eventToEdit.name = editedBody.name || eventToEdit.name
    eventToEdit.description = editedBody.description || eventToEdit.description
    await eventToEdit.save()
    return eventToEdit
  }
}

export const towerEventsService = new TowerEventsService()
