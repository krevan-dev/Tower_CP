<template>
  <div class="container-fluid">
    <div class="row">
      <HomeBanner />
    </div>
    <div class="row d-flex justify-content-center">
      <EventCard v-for="e in 4" :key="e"/>
      <CommentCard v-for="c in 3" :key="c"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">

</style>
