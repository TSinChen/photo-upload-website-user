import axios from './axios'
import { Post } from '../types/post'

const getPosts = async (): Promise<{ data: Post[] }> => await axios.get('/posts')

export default {
  getPosts,
}
