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
        <form>
          <div class="row mx-1">
            <textarea class="mt-3" placeholder="Add a comment..." name="" id="" cols="169" rows="4"></textarea>
          </div>
        </form>
        <CommentCard v-for="c in comments" :key="c.id" :comment="c"/>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { eventsService } from '../services/EventsService'
import { commentsService } from '../services/CommentsService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
export default {
  setup(){
    const route = useRoute()
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
      activeEvent: computed(() => AppState.activeEvent),
      comments: computed(() => AppState.comments)
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