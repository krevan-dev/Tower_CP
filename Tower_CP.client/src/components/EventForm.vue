<template>
  <form @submit.prevent="handleEvent()">
    <div class="form-group">
      <label for="eventName">Event Name</label>
      <input required type="text" class="form-control" id="eventName" placeholder="Event Name" v-model="editable.name">
    </div>
    <div class="form-group mt-3">
      <label for="eventDescription">Event Description</label>
      <textarea class="form-control" id="eventDescription" rows="3" placeholder="Event Description" v-model="editable.description"></textarea>
    </div>
    <div class="form-group mt-3">
      <label for="eventLocation">Event Location</label>
      <input required type="text" class="form-control" id="eventLocation" placeholder="Event Location" v-model="editable.location">
    </div>
    <div class="form-group mt-3">
      <label for="eventDate">Event Date</label>
      <input required type="date" class="form-control" id="eventDate" v-model="editable.startDate">
    </div>
    <div class="form-group mt-3">
      <label for="eventCapacity">Event Capacity</label>
      <input required type="number" class="form-control" id="eventCapacity" placeholder="Event Capacity" v-model="editable.capacity">
    </div>
    <div class="form-group mt-3">
      <label for="eventImage">Event Image</label>
      <input required type="text" class="form-control" id="eventImage" placeholder="Event Image" v-model="editable.coverImg">
    </div>
    <div class="form-group mt-3">
      <label for="eventType">Event Type</label>
      <select required name="type" class="form-control" id="eventType" v-model="editable.type">
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
import { AppState } from '../AppState'
export default {
  setup(){
    const router = useRouter()
    const editable = ref({ name: "", description: "", location: "", startDate: "", capacity: "", coverImg: "", type: "" })
    return {
      editable,
      async handleEvent() {
        try {
          await eventsService.createEvent(editable.value)
          Modal.getOrCreateInstance(document.getElementById('eventModal')).hide()
          editable.value = {}
          Pop.toast("Event created!")
          router.push({
            name: 'Event',
            params: { id: AppState.activeEvent.id }
          })
        } catch (error) {
          Pop.toast(error.message, "error")
          logger.log(error)
        }
      }
    }
  }
}
</script>