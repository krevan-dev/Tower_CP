<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer class="mt-3">
    <div class="bg-dark text-light text-center p-4">
      Made with ❤️ by Kyle E.
    </div>
  </footer>
  <Modal id="eventModal">
    <template #modal-title>
    </template>
    <template #modal-body>
      <EventForm />
    </template>
  </Modal>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
