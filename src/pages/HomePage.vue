<template>
  <div class="container">
    <div class="row mt-2">
      <div class="col-12">
        <form class="form-inline" @submit.prevent="createBlog">
          <div class="form-group">
            <input
              type="text"
              name="title"
              id="title"
              class="form-control"
              placeholder="Title"
              aria-describedby="helpId"
              v-model="state.newBlog.title"
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
              v-model="state.newBlog.body"
            />
          </div>
          <button class="btn btn-info" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
    <div class="row mt-5" v-if="!blogData">
      <Blog v-for="blogData in state.blogs" :key="blogData._id" :blog="blogData">
      </blog>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogsService } from '../services/BlogsService.js'
import { useRouter } from 'vue-router'

export default {
  name: '',
  setup() {
    const router = useRouter()
    const state = reactive({
      blogs: computed(() => AppState.blogs),
      newBlog: {}
    })
    onMounted(() => {
      blogsService.getBlogs()
    })
    return {
      state,
      async createBlog() {
        const blogId = await blogsService.createBlog(state.newBlog)
        router.push({ name: 'BlogDetails', params: { id: blogId } })
        state.newBlog = {}
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
