import React from 'react'
import type { IPost } from '../../types/post'

interface IPostCardProps {
    post: IPost
}

const PostCard = ({post} :IPostCardProps) => {
  return (
    <div className="p-4 rounded shadow cursor-pointer relative">
        <div className="flex flex-col">
            <a href={`/posts/${post.id}`}>
              <span className='absolute inset-0'></span>
              <h4 className='font-bold'>{post?.title}</h4>
            </a>
            <p>{post.body.slice(0,60)} ...</p>
        </div>
    </div>
  )
}

export default PostCard