import { AppState } from '../AppState.js'
import { api } from './AxiosService'

class BlogsService {
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

  async deleteBlog(id) {
    try {
      await api.delete('api/blogs/' + id)
    } catch (error) {
      console.error(error)
    }
  }
}
export const blogsService = new BlogsService()
