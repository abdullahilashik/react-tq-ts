import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'

const LIMIT = 20

// Notice: we type the return value so TS can infer correctly
async function fetchPosts({ pageParam = 1 }: { pageParam?: number }) {
  const res = await axios.get('http://localhost:3000/posts', {
    params: { _page: pageParam, _limit: LIMIT },
  })
  return res.data as { id: number; title: string }[]
}

export default function PostInfiniteQuery() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    initialPageParam: 1, // 👈 required in v5
    getNextPageParam: (lastPage, allPages) => {
        console.log('Last page: ', lastPage);
        console.log('All pages: ', allPages);
      return lastPage.length < LIMIT ? undefined : allPages.length + 1
    },
  })

  if (status === 'pending') return <p>Loading...</p>
  if (status === 'error') return <p>Error fetching posts</p>

  return (
    <div>
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.map((post) => (
            <p key={post.id}>{post.title}</p>
          ))}
        </div>
      ))}

      <button
      className='fixed right-4 top-4 px-4 py-2 rounded shadow bg-red-600 text-white cursor-pointer disabled:cursor-not-allowed'
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
          ? 'Load More'
          : 'No more posts'}
      </button>
    </div>
  )
}
