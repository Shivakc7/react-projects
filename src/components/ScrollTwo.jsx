import { useRef, useCallback } from "react"
import SinglePost from "./SinglePost"
import { useInfiniteQuery } from "react-query"
import { getPostsPage } from "../api/Axios"

const ScrollTwo = () => {
  const {
    fetchNextPage, //function
    hasNextPage, //boolean
    isFetchingNextPage, //boolean
    data,
    status,
    error,
  } = useInfiniteQuery("/posts", ({ pageParam = 1 }) => getPostsPage(pageParam), {
    getNextPageParam : (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined
    }
  })

  const intObserver = useRef()
  const lastPostRef = useCallback(
    post => {
      if (isFetchingNextPage) return

      if (intObserver.current) intObserver.current.disconnect()

      intObserver.current = new IntersectionObserver(posts => {
        if (posts[0].isIntersecting && hasNextPage) {
          console.log("We are near the last post!")
          fetchNextPage()
        }
      })

      if (post) intObserver.current.observe(post)
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  )

//   isError && <p className="center">Error: {error.message}</p>

if(status === 'error') return  <p className="center">Error: {error.message}</p>

  const content = data?.pages.map(page => {
     return page.map((post, i) => {
        if (page.length === i + 1) {
          return <SinglePost ref={lastPostRef} key={post.id} post={post} />
        }
        return <SinglePost key={post.id} post={post} />
      })

  })
  
  

  return (
    <>
      <h1 id="top" className="text-[40px] text-green-500">
        &infin; Infinite Query &amp; Scroll
        <br />
        &infin; Ex. 2 - React Query
      </h1>
      <div className="container mx-auto flex flex-col items-center">
        {content}
      </div>
      {isFetchingNextPage && <p className="center">Loading More Posts...</p>}
      <p className="text-white text-center scroll-smooth">
        <a href="#top">Back to Top</a>
      </p>
    </>
  )
}
export default ScrollTwo
