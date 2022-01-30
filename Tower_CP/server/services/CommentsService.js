import { BadRequest } from '@bcwdev/auth0provider/lib/Errors'
import { dbContext } from '../db/DbContext'

class CommentsService {
  async postComment(body) {
    const comment = await dbContext.Comments.create(body)
    return comment
  }

  async deleteComment(commentId, userId) {
    const foundComment = await dbContext.Comments.findById(commentId)
    if (foundComment.creatorId.toString() !== userId) {
      throw new BadRequest('You are not authorized to delete this comment')
    }
    await foundComment.remove()
    return foundComment
  }

  async getEventComments(commentId) {
    const comment = await dbContext.Comments.findByIdAndRemove(commentId)
    return comment
  }
}

export const commentsService = new CommentsService()
