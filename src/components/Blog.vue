<template>
  <div class="col-4 card Blog">
    <router-link :to="{name: 'BlogDetails', params: { id: blog.id } }">
      <div class="card-body">
        <h4 class="card-title">
          {{ blog.title }}
        </h4>
        <p class="card-text">
          {{ blog.body }}
        </p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Blog',
  props: {
    blog: Object
  },
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.Blog{
    cursor: pointer

}
</style>
