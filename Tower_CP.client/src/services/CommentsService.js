import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService {
  async getCommentsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    logger.log(res.data)
    AppState.comments = res.data
  }

  async createComment() {

  }
}

export const commentsService = new CommentsService