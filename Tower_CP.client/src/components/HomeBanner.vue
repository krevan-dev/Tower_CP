<template>
  <div class="col-md-12 mt-3">
    <div class="card w-100 h-auto bg-dark">
      <div class="card-body coverImg d-flex flex-column justify-content-end">
        <h5 class="card-title">Welcome to Tower Events!</h5>
        <p class="card-text">Get your tickets before anyone else!</p>
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
.coverImg {
  background-image: url('src/assets/img/unsplash-concert.jpg');
  height: 35vh;
  background-size: cover;
  background-position: center;
}
</style>