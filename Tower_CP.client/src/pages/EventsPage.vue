<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-11">
        <div class="card mt-3">
          <img :src="activeEvent.coverImg" class="card-img-top rounded imgBanner" alt="...">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <h3 class="card-title">{{activeEvent.name}} - {{activeEvent.location}}</h3>
              <h4>{{activeEvent.capacity}} seats remaining.</h4>
            </div>
            <h6 class="card-text">{{new Date(activeEvent.startDate).toDateString()}} - {{new Date(activeEvent.startDate).toTimeString()}}</h6>
            <p class="card-text">{{activeEvent.description}}</p>
            <div class="d-flex justify-content-end">
              <a href="#" class="btn btn-success">Mark as attending</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-9 bg-white mt-3 px-3">
        <form @submit.prevent="createComment()">
          <div class="row mx-1 mt-3">
            <input type="text" class="form-control" placeholder="Add a comment..." v-model="editable.body">
          </div>
        </form>
        <CommentCard v-for="c in comments" :key="c.id" :comment="c"/>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { eventsService } from '../services/EventsService'
import { commentsService } from '../services/CommentsService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
export default {
  setup(){
    const route = useRoute()
    const editable = ref({ eventId: route.params.id, body: "" })
    onMounted(async () => {
      try {
        await eventsService.getEventById(route.params.id)
        await commentsService.getCommentsByEventId(route.params.id)
      } catch (error) {
        Pop.toast(error.message, "error")
        logger.log(error)
      }
    })
    return {
      editable,
      activeEvent: computed(() => AppState.activeEvent),
      comments: computed(() => AppState.comments),
      async createComment() {
        try {
          await commentsService.createComment(editable.value)
          editable.value.body = ""
          Pop.toast("Comment successful!")
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
.imgBanner {
  height: 45vh;
  object-fit: cover;
  object-position: 15%;
}
</style>