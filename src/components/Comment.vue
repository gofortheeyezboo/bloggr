<template>
  <div class="Comment">
    <ul v-if="comment.creator">
      <li>{{ comment.body }} <i class="fas fa-times text-danger action" @click="deleteComment" v-if="comment.creator.email == state.user.email"></i></li>
      <li>User: {{ comment.creator.email }}</li>
    </ul>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogsService } from '../services/BlogsService'

export default {
  name: 'Comment',
  props: {
    comment: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user)
    })
    return {
      state,
      deleteComment() {
        blogsService.deleteComment(props.comment.id, props.comment.blog)
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
