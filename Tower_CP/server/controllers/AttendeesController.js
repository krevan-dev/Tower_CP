import { Auth0Provider } from '@bcwdev/auth0provider'
import { attendeesService } from '../services/AttendeesService'
import BaseController from '../utils/BaseController'

export class AttendeesController extends BaseController {
  constructor() {
    super('api/attendees')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.attendEvent)
      .delete('/:id', this.removeAttendee)
  }

  async attendEvent(req, res, next) {
    try {
      const event = await attendeesService.attendEvent()
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async removeAttendee(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const attendee = await attendeesService.removeAttendee()
      return res.send(attendee)
    } catch (error) {
      next(error)
    }
  }
}
