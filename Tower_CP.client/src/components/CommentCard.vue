<template>
  <div class="mb-3">
    <div class="card">
      <div class="card-body d-flex">
        <div class="me-3">
          <img class="userImg" :src="comment.creator.picture" alt="user.picture">
        </div>
        <div>
          <div class="d-flex justify-content-between">
            <h5 class="card-title">{{comment.creator.name}}</h5>
            <i @click="removeComment()" class="mdi mdi-delete"></i>
          </div>
          <p>{{comment.body}}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { commentsService } from '../services/CommentsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    }
  },
  setup(props){
    return {
      async removeComment() {
        try {
          if (await Pop.confirm()) {
            await commentsService.removeComment(props.comment.id)
          }
          Pop.toast("Comment removed", "success")
        } catch (error) {
          Pop.toast(error.message, "error")
          logger.log(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.userImg {
  height: 125px;
  width: 125px;
  border-radius: 50%;
}
</style>