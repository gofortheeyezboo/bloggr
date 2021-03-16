<template>
  <div class="blog-details container">
    <div class="row">
      <div class="col">
        <form class="form-inline" @submit.prevent="editBlog">
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
          <div v-if="state.blog.creator">
          <button class="btn btn-info" type="submit" v-if="state.blog.creator.email == state.user.email">
            Post Changes
          </button>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-4 card">
        <div class="card-body">
          <h4 class="card-title" v-if="state.blog.creator">
            {{ state.blog.title }} <i class="fas fa-times text-danger action" @click="deleteBlog" v-if="state.blog.creator.email == state.user.email"></i>
          </h4>
          <p class="card-text">
            {{ state.blog.body }}
          </p>
          <h5>Comments:</h5>
          <Comment v-for="commentData in state.comments" :key="commentData._id" :comment="commentData">
          </comment>
          <form class="form-inline" @submit.prevent="createComment">
            <div class="form-group">
              <input
                type="text"
                name="body"
                id="body"
                class="form-control"
                placeholder="Comment Here..."
                aria-describedby="helpId"
                v-model="state.newComment.body"
              />
            </div>
            <button class="btn btn-info mt-1" type="submit" v-if="state.blog.creator">
              Post Comment
            </button>
          </form>
        </div>
      </div>
    </div>
    <div class="col">
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
      blog: computed(() => AppState.activeBlog),
      user: computed(() => AppState.user),
      comments: computed(() => AppState.comments),
      newComment: {}
    })
    onMounted(async() => {
      await blogsService.getBlog(route.params.id)
      await blogsService.getComments(route.params.id)
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
      },
      async editBlog() {
        await blogsService.editBlog(state.blog.id, state.blog)
        router.push({ name: 'Home' })
      },
      async createComment() {
        await blogsService.createComment({ blog: state.blog.id, body: state.newComment.body })
        state.newComment = {}
      }
    }
  },
  components: {

  }
}
</script>

<style lang="scss" scoped>

</style>
