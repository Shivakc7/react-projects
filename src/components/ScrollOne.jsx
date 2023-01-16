import { useState, useRef, useCallback } from 'react'
import usePosts from '../hooks/usePosts'
import SinglePost from './SinglePost'

const ScrollOne = () => {
    const [pageNum, setPageNum] = useState(1)
    const {
        isLoading,
        isError,
        error,
        results,
        hasNextPage
    } = usePosts(pageNum)

    const intObserver = useRef()
    const lastPostRef = useCallback(post => {
        if (isLoading) return

        if (intObserver.current) intObserver.current.disconnect()

        intObserver.current = new IntersectionObserver(posts => {
            if (posts[0].isIntersecting && hasNextPage) {
                console.log('We are near the last post!')
                setPageNum(prev => prev + 1)
            }
        })

        if (post) intObserver.current.observe(post)
    }, [isLoading, hasNextPage])


    
    isError && <p className='center'>Error: {error.message}</p>
    

    const content = results.map((post, i) => {
      console.log(post)
        if (results.length === i + 1) {
            return <SinglePost ref={lastPostRef} key={post.id} post={post} />
        }
        return <SinglePost key={post.id} post={post} />
    })

    return (
        <>
            <h1 id="top" className='text-[40px] text-green-500'>&infin; Infinite Query &amp; Scroll<br />&infin; Ex. 1 - React only</h1>
            <div className='container mx-auto flex flex-col items-center'>

            {content}
            </div>
            {isLoading && <p className="center">Loading More Posts...</p>}
            <p className="center"><a href="#top">Back to Top</a></p>
        </>
    )
}
export default ScrollOne