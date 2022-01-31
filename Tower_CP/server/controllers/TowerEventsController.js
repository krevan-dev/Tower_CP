import { Auth0Provider } from '@bcwdev/auth0provider'
import { attendeesService } from '../services/AttendeesService'
import { commentsService } from '../services/CommentsService'
import { towerEventsService } from '../services/TowerEventsService'
import BaseController from '../utils/BaseController'

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:id', this.getEventById)
      .get('/:id/attendees', this.getEventAttendees)
      .get('/:id/comments', this.getEventComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:id', this.editEvent)
      .delete('/:id', this.cancelEvent)
  }

  async getAllEvents(req, res, next) {
    try {
      const events = await towerEventsService.getAllEvents()
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getEventById(req, res, next) {
    try {
      const event = await towerEventsService.getEventById(req.params.id)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async getEventAttendees(req, res, next) {
    try {
      const attendee = await attendeesService.getEventAttendees(req.params.id)
      return res.send(attendee)
    } catch (error) {
      next(error)
    }
  }

  async getEventComments(req, res, next) {
    try {
      const comments = await commentsService.getEventComments(req.params.id)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async createEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const event = await towerEventsService.createEvent(req.body)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async editEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const editedEvent = towerEventsService.editEvent(req.params.id, req.body)
      res.send(editedEvent)
    } catch (error) {
      next(error)
    }
  }

  async cancelEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const deletedEvent = towerEventsService.deleteEvent(req.params.id)
      res.send(deletedEvent)
    } catch (error) {
      next(error)
    }
  }
}
