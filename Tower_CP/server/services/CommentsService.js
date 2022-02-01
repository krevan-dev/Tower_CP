import { BadRequest } from '@bcwdev/auth0provider/lib/Errors'
import { dbContext } from '../db/DbContext'

class CommentsService {
  async createComment(body) {
    const comment = await dbContext.Comments.create(body)
    await comment.populate('creator')
    await comment.populate('event')
    return comment
  }

  async deleteComment(commentId, userId) {
    const foundComment = await dbContext.Comments.findById(commentId)
    if (foundComment.creatorId.toString() !== userId) {
      throw new BadRequest('You are not authorized to delete this comment')
    }
    await dbContext.Comments.findByIdAndDelete(commentId)
  }

  async getEventComments(eventId) {
    const comments = await dbContext.Comments.find(eventId).populate('creator')
    return comments
  }
}

export const commentsService = new CommentsService()
