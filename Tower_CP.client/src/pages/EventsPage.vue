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
              <h3 v-if="activeEvent.isCanceled" class="text-danger">Sorry, this event has been cancelled.</h3>
              <h3 v-if="activeEvent.capacity == 0" class="text-danger">Sorry, this event has reached it's capacity.</h3>
              <button v-if="account.id && !activeEvent.isCanceled" :disabled="activeEvent.id == myEvents.eventId" class="btn btn-success" @click.prevent="attendEvent(account.id, activeEvent.id)">Mark as attending</button>
              <button v-if="activeEvent.creatorId === account.id && !activeEvent.isCanceled" class="btn btn-info mx-2" data-bs-target="#edit-modal" data-bs-toggle="modal">Edit Event</button>
              <button v-if="activeEvent.creatorId === account.id && !activeEvent.isCanceled" @click.prevent="cancelEvent()" class="btn btn-danger">Cancel Event</button>
            </div>
            <div>
              <h5>Other Attendees:</h5>
              <img :src="a.account.picture" alt="Account pic" class="rounded-circle attendPic" v-for="a in attendees" :key="a.accountId" :title="a.account.name">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-9 bg-white mt-3 px-3">
        <form @submit.prevent="createComment()">
          <div v-if="account.id" class="row mx-1 my-3">
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
import { router } from '../router'
import { attendeesService } from '../services/AttendeesService'
export default {
  setup(){
    const route = useRoute()
    const editable = ref({ eventId: route.params.id, body: "" })
    onMounted(async () => {
      try {
        await eventsService.getEventById(route.params.id)
        await commentsService.getCommentsByEventId(route.params.id)
        await attendeesService.getAttendees(route.params.id)
      } catch (error) {
        Pop.toast(error.message, "error")
        logger.log(error)
      }
    })
    return {
      editable,
      account: computed(() => AppState.account),
      activeEvent: computed(() => AppState.activeEvent),
      comments: computed(() => AppState.comments),
      myEvents: computed(() => AppState.myEvents),
      attendees: computed(() => AppState.attendees),
      async createComment() {
        try {
          await commentsService.createComment(editable.value)
          editable.value.body = ""
          Pop.toast("Comment successful!")
        } catch (error) {
          Pop.toast(error.message, "error")
          logger.log(error)
        }
      },
      async cancelEvent() {
        try {
          if (await Pop.confirm()) {
            await eventsService.cancelEvent(route.params.id)
            router.push({
              name: 'Home',
            })
          }
        } catch (error) {
          Pop.toast(error.message, "error")
          logger.log(error)
        }
      },
      async attendEvent(accountId, eventId) {
        try {
          await attendeesService.attendEvent(accountId, eventId)
          Pop.toast("You've successfully marked yourself as attending!")
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
.greyscale {
  filter: grayscale(100%);
}
.attendPic {
  height: 25px;
  width: 25px;
}
</style>