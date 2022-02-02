<template>
  <form @submit.prevent="handleEvent()">
    <div class="form-group">
      <label for="eventName">Event Name</label>
      <input required type="text" class="form-control" id="eventName" placeholder="Event Name" v-model="newEvent.name">
    </div>
    <div class="form-group mt-3">
      <label for="eventDescription">Event Description</label>
      <textarea class="form-control" id="eventDescription" rows="3" placeholder="Event Description" v-model="newEvent.description"></textarea>
    </div>
    <div class="form-group mt-3">
      <label for="eventLocation">Event Location</label>
      <input required type="text" class="form-control" id="eventLocation" placeholder="Event Location" v-model="newEvent.location">
    </div>
    <div class="form-group mt-3">
      <label for="eventDate">Event Date</label>
      <input required type="date" class="form-control" id="eventDate" v-model="newEvent.startDate">
    </div>
    <div class="form-group mt-3">
      <label for="eventCapacity">Event Capacity</label>
      <input required type="number" class="form-control" id="eventCapacity" placeholder="Event Capacity" v-model="newEvent.capacity">
    </div>
    <div class="form-group mt-3">
      <label for="eventImage">Event Image</label>
      <input required type="text" class="form-control" id="eventImage" placeholder="Event Image" v-model="newEvent.coverImg">
    </div>
    <div class="form-group mt-3">
      <label for="eventType">Event Type</label>
      <select required name="type" class="form-control" id="eventType" v-model="newEvent.type">
        <option selected value="">Select an event type</option>
        <option value="concert">Concert</option>
        <option value="convention">Convention</option>
        <option value="digital">Digital Event</option>
        <option value="sport">Sporting Event</option>
      </select>
    </div>
    <div class="mt-3 d-flex justify-content-between">
      <button type="submit" class="btn btn-success">Submit</button>
      <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cancel</button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { eventsService } from '../services/EventsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { useRouter } from 'vue-router'
import { Modal } from 'bootstrap'
export default {
  setup(){
    const newEvent = ref({ name: "", description: "", location: "", startDate: "", capacity: "", coverImg: "", type: "" })
    const router = useRouter()
    return {
      newEvent,
      async handleEvent() {
        try {
          // debugger
          await eventsService.createEvent(newEvent.value)
          Modal.getOrCreateInstance(document.getElementById('createEvent')).hide()
          newEvent.value = {}
          Pop.toast("Event created!")
          // router.push({
          //   name: 'Event',
          //   params: { id }
          // })
        } catch (error) {
          Pop.toast(error.message, "error")
          logger.log(error)
        }
      }
    }
  }
}
</script>