<template>
  <div class="mt-3">
    <div class="card">
      <div class="card-body d-flex">
        <div class="me-3">
          <img class="userImg" :src="comment.creator.picture" alt="user.picture">
        </div>
        <div>
          <h5 class="card-title">{{comment.creator.name}}</h5>
          <p>{{comment.body}}</p>
        </div>
      </div>
      <div class="d-flex justify-content-end mx-3 my-2 text-muted">{{comment.createdAt}}</div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    }
  },
  setup(){
    return {}
  }
}
</script>


<style lang="scss" scoped>
.userImg {
  height: 125px;
  width: 125px;
  border-radius: 50%;
}
</style>