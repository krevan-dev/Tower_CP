import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'
import BaseController from '../utils/BaseController'

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.postComment)
      .delete('/:id', this.deleteComment)
  }

  async postComment(req, res, next) {
    try {
      const comment = await commentsService.postComment(req.body)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async deleteComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.deleteComment(req.params.id, req.userInfo.id)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }
}
