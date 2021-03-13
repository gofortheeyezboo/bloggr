<template>
  <div class="blog-details container">
    <div class="row">
      <div class="col">
        <button type="button" class="btn btn-outline-danger" @click="deleteBlog">
          Delete Blog
        </button>
        <form class="form-inline" onsubmit="app.blogsController.createBlog(event)">
          <div class="form-group">
            <input
              type="text"
              name="title"
              id="title"
              class="form-control"
              placeholder="Title"
              aria-describedby="helpId"
              v-model="state.blog.title"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              name="body"
              id="body"
              class="form-control"
              placeholder="Body"
              aria-describedby="helpId"
              v-model="state.blog.body"
            />
          </div>
          <button class="btn btn-info" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="card-body">
        <h4 class="card-title">
          {{ state.blog.title }}
        </h4>
        <p class="card-text">
          {{ state.blog.body }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { onBeforeRouteLeave, useRouter, useRoute } from 'vue-router'
import { blogsService } from '../services/BlogsService'

export default {
  name: 'BlogDetailsPage',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      blog: computed(() => AppState.activeBlog)
    })
    onMounted(() => {
      blogsService.getBlog(route.params.id)
    })

    onBeforeRouteLeave((to, from, next) => {
      if (window.confirm('Are you sure?')) {
        AppState.activeBlog = {}
        next()
      }
    })
    return {
      state,
      route,
      async deleteBlog() {
        await blogsService.deleteBlog(state.blog.id)
        router.push({ name: 'Home' })
      }
    }
  },
  components: {

  }
}
</script>

<style lang="scss" scoped>

</style>
