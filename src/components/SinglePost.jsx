import React from 'react'

const SinglePost = React.forwardRef(({post}, ref) => {
    const postBody = (
        <div className='text-center border-2 mb-2 bg-blue-300 rounded-xl '>
            <h2 className='text-[20px]'>{post.title}</h2>
            <p className='text-lg'>{post.body}</p>
            <p>Post ID: {post.id} </p>
        </div>
    )
    const content = ref 
    ? <div ref={ref}>{postBody}</div>
    : <div>{postBody}</div>


    return content
})


export default SinglePost