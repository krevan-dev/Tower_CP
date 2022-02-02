import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService {
  async getCommentsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    // logger.log(res.data)
    AppState.comments = res.data
  }

  async createComment(newComment) {
    const res = await api.post('api/comments', newComment)
    // logger.log(res.data)
    AppState.comments.push(res.data)
  }

  async removeComment(commentId) {
    const res = await api.delete(`api/comments/${commentId}`)
    // logger.log(res.data)
    AppState.comments = AppState.comments.filter(comment => comment.id !== commentId)
  }
}

export const commentsService = new CommentsService