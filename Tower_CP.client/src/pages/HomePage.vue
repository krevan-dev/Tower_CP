<template>
  <div class="container-fluid">
    <div class="row">
      <HomeBanner />
    </div>
    <div class="row d-flex justify-content-center">
      <EventCard class="eventCard" v-for="e in events" :key="e.id" :event="e"/>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { eventsService } from '../services/EventsService'
export default {
  name: 'Home',
  setup() {
    onMounted(async () => {
      try {
        await eventsService.getAllEvents()
      } catch (error) {
        Pop.toast(error.message, "error")
        logger.log(error)
      }
    })
    return {
      events: computed(() => AppState.events)
    }
  }
}
</script>

<style scoped lang="scss">
.eventCard:hover {
  transform: scale(0.95);
}
</style>
