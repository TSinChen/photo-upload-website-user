import { Fragment, useState, useEffect } from 'react'
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from '@mui/material'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

import apis from '../../apis/apis'
import { Post } from '../../types/post'

const List = () => {
  const [posts, setPosts] = useState<Post[]>([])

  const fetchPosts = async () => {
    try {
      const result = await apis.getPosts()
      setPosts(result.data.reverse())
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <Fragment>
      <ImageList variant="masonry" cols={3} gap={20} sx={{ maxWidth: '1200px', margin: '40px auto' }}>
        {posts.map((post) => (
          <ImageListItem key={post._id}>
            <Zoom>
              <img src={post.imageLink} loading="lazy" style={{ width: '100%' }} />
            </Zoom>
            <ImageListItemBar
              title={<Typography variant="h6">{post.title}</Typography>}
              subtitle={<Typography variant="body2">{post.description}</Typography>}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Fragment>
  )
}

export default List
