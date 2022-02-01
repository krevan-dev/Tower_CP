import { Auth0Provider } from '@bcwdev/auth0provider'
import { attendeesService } from '../services/AttendeesService'
import BaseController from '../utils/BaseController'

export class AttendeesController extends BaseController {
  constructor() {
    super('api/attendees')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.attendEvent)
      .delete('/:id', this.unattendEvent)
  }

  async attendEvent(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const event = await attendeesService.attendEvent(req.body, req.body.eventId)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async unattendEvent(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const event = await attendeesService.unattendEvent(req.body, req.userInfo.id)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }
}
