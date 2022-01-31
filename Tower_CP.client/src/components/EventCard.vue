<template>
<div class="col-md-3 col-sm-6 mt-3">
  <div class="card bg-dark text-white selectable">
    <img src="src/assets/img/concert-card-img.jpg" class="card-img cardSize" alt="...">
    <div class="card-img-overlay">
      <h5 class="card-title">Event Name</h5>
    </div>
  </div>
</div>
</template>


<script>
export default {
  setup(){
    return {}
  }
}
</script>


<style lang="scss" scoped>
.cardSize {
  height: 40vh;
  object-fit: cover;
  object-position: bottom;
}
</style>