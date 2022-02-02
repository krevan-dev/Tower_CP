<template>
  <div class="row d-flex justify-content-center">
    <div class="d-flex justify-content-center">
    <button class="mx-1 btn btn-info" @click.prevent="unattendEvent(account.id)" v-for="ticket in myEvents" :key="ticket.id">Unattend {{ticket.event.name}}</button>
    </div>
    <EventCard v-for="ticket in myEvents" :key="ticket.id" :event="ticket.event" />
  </div>
  <br />
  <div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { accountService } from '../services/AccountService'
import { attendeesService } from '../services/AttendeesService'
export default {
  name: 'Account',
  setup() {
    onMounted(async () => {
      try {
        await accountService.getAllMyEvents()
      } catch (error) {
        Pop.toast(error.message, "error")
        logger.log(error)
      }
    })
    return {
      myEvents: computed(() => AppState.myEvents),
      account: computed(() => AppState.account),
      attendees: computed(() => AppState.attendees),
      async unattendEvent(accountId) {
        try {
          await attendeesService.unattendEvent(accountId)
          Pop.toast("You have successfully marked yourself as not attending this event.")
        } catch (error) {
          Pop.toast(error.message, "error")
          logger.log(error)
        }
      }
      }
    }
  }
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
