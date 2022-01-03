import { Fragment, useState, useEffect } from 'react'
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material'

import apis from '../../apis/apis'
import { Post } from '../../types/post'

const List = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [dialogImage, setDialogImage] = useState<{ open: boolean; post: Post | null }>({
    open: false,
    post: null,
  })

  const fetchPosts = async () => {
    try {
      const result = await apis.getPosts()
      setPosts(result.data.reverse())
    } catch (error) {
      console.error(error)
    }
  }

  const openDialogImage = (index: number) => {
    setDialogImage({ open: true, post: posts[index] })
  }

  const closeDialogImage = () => {
    setDialogImage({ open: false, post: null })
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <Fragment>
      <ImageList variant="masonry" cols={3} gap={20} sx={{ maxWidth: '1200px', margin: '40px auto' }}>
        {posts.map((post, index) => (
          <ImageListItem key={post._id}>
            <img
              src={post.imageLink}
              loading="lazy"
              style={{ cursor: 'zoom-in' }}
              onClick={() => openDialogImage(index)}
            />
            <ImageListItemBar
              title={<Typography variant="h6">{post.title}</Typography>}
              subtitle={<Typography variant="body2">{post.description}</Typography>}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Dialog open={dialogImage.open} onClose={closeDialogImage}>
        <DialogTitle>
          <Typography variant="h5" my={1}>
            {dialogImage.post?.title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <img
            src={dialogImage.post?.imageLink}
            style={{ width: '100%', height: '100%', cursor: 'zoom-out' }}
            onClick={closeDialogImage}
          />
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default List
