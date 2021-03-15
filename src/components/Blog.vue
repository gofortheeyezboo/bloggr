<template>
  <div class="col-4 card Blog">
    <router-link :to="{name: 'BlogDetails', params: { id: blog.id } }">
      <div class="card-body">
        <h4 class="card-title">
          {{ blog.title }}
        </h4>
        <p class="card-text">
          {{ blog.creator ? blog.creator.email : "NoUserEmail" }}
        </p>
      </div>
    </router-link>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogsService } from '../services/BlogsService'

export default {
  name: 'Blog',
  props: {
    blog: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user)
    })
    return {
      state,
      deleteBlog() {
        blogsService.deleteBlog(props.blog.id)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.Blog{
    cursor: pointer

}
</style>
