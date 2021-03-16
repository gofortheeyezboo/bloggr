<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="about text-center">
          <h1>Welcome {{ state.account.name }}</h1>
          <img class="rounded" :src="state.account.picture" alt="" />
          <p>{{ state.account.email }}</p>
          <Blog v-for="blogData in state.userBlogs" :key="blogData._id" :blog="blogData">
          </blog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogsService } from '../services/BlogsService'
export default {
  name: 'Account',
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      userBlogs: computed(() => AppState.userBlogs)
    })
    onMounted(() => {
      blogsService.getUserBlogs()
      console.log(AppState.userBlogs)
    })
    return {
      state
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
