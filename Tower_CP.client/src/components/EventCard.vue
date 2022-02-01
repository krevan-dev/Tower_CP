<template>
<div class="col-md-3 col-sm-6 mt-3">
  <div class="card bg-dark text-white selectable" :title="event.name" @click="goToEvent()">
    <img :src="event.coverImg" class="card-img cardSize" alt="...">
    <div class="card-img-overlay">
      <h4 class="card-title">{{event.name}}</h4>
      <h6>{{new Date(event.startDate).toLocaleString()}}</h6>
      <h6>{{event.location}}</h6>
      <h6>{{event.capacity}} seats available</h6>
    </div>
  </div>
</div>
</template>


<script>
import { useRouter } from 'vue-router'
export default {
  props: {
    event: {
      type: Object,
      required: true,
    }
  },
  setup(props){
    const router = useRouter();
    return {
      goToEvent(){
        router.push({
          name: "Event",
          params: { id: props.event.id}
        })
      },
      router
    }
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