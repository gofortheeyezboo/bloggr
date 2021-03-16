import { AppState } from '../AppState.js'
import { api } from './AxiosService'

class BlogsService {
  async getComments(id) {
    try {
      const res = await api.get('api/blogs/' + id + '/comments')
      AppState.comments = res.data
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  async getUserBlogs() {
    try {
      const res = await api.get('account/blogs')
      AppState.userBlogs = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async getBlogs() {
    try {
      const res = await api.get('api/blogs')
      AppState.blogs = res.data
      // eslint-disable-next-line no-console
      console.log(res)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  async getBlog(id) {
    try {
      const res = await api.get('api/blogs/' + id)
      AppState.activeBlog = res.data
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  async createBlog(rawBlog) {
    try {
      const res = await api.post('api/blogs', rawBlog)
      AppState.blogs.push(res.data)
      return res.data._id
    } catch (error) {
      console.error(error)
    }
  }

  async createComment(rawComment) {
    try {
      const res = await api.post('/api/comments', rawComment)
      AppState.comments.push(res.data)
      return res.data_id
    } catch (error) {
      console.error(error)
    }
  }

  async deleteBlog(id) {
    try {
      await api.delete('api/blogs/' + id)
    } catch (error) {
      console.error(error)
    }
  }

  async deleteComment(commentid, blogId) {
    try {
      await api.delete('api/comments/' + commentid)
      this.getComments(blogId)
    } catch (error) {
      console.error(error)
    }
  }

  async editBlog(id, blog) {
    try {
      await api.put('api/blogs/' + id, blog)
    } catch (error) {
      console.error(error)
    }
  }
}
export const blogsService = new BlogsService()
