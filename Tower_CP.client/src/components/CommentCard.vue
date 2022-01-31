<template>
  <div class="col-md-9 mt-3">
    <div class="card">
      <div class="card-body d-flex">
        <div class="me-3">
          <img class="userImg" src="//thiscatdoesnotexist.com" alt="user.picture">
        </div>
        <div>
          <h5 class="card-title">User Name</h5>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus corporis fuga ut repellat veniam maxime libero omnis ipsum, necessitatibus in voluptate quaerat iste ducimus suscipit quam harum nulla, saepe commodi.</p>
        </div>
      </div>
      <div class="d-flex justify-content-end mx-3 my-1 text-muted">Posted 5 minutes ago.</div>
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
.userImg {
  height: 125px;
  width: 125px;
  border-radius: 50%;
}
</style>