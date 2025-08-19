import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React, { useCallback, useState } from 'react'
import { getPostsPaginated } from '../../lib/http-requests/posts'
import PostCard from '../posts/PostCard'
import type { IPost } from '../../types/post'

const PaginatedPosts = () => {

    const [page, setPage] = useState<number>(1);

    const {
        isLoading,
        isFetching,
        isPlaceholderData,
        data: posts
    } = useQuery({
        queryKey: ['posts', 'paginated', page],
        queryFn: ({queryKey}) => {
            const [_key, _type, page] = queryKey;            
            return getPostsPaginated(page as number, 10)
        },
        placeholderData: keepPreviousData
    })        

    const handleNext = useCallback(() => {
        if(posts?.next){
            // has next page
            setPage(i => i+1);
        }
    }, [posts]);
    const handlePrevious = useCallback(() => {
        if(posts?.prev){
            // has next page
            setPage(i => i-1);
        }
    }, [posts]);

  return (
    <div className="flex flex-col gap-4 p-12">
        <h1 className='text-2xl font-semibold'>Paginated Posts {isPlaceholderData ? page-1 : page}</h1>
        {(isLoading || isFetching) && <p className="text-xs">loading...</p>}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {
                posts?.data?.map((post: IPost)=>(
                    <PostCard post={post} key={post?.id} />
                ))
            }
        </div>
        <div className="flex items-center gap-2">
            <button disabled={!posts?.prev} onClick={handlePrevious} className='disabled:cursor-not-allowed px-4 py-2 rounded shadow font-semibold cursor-pointer'>Previous</button>
            <button disabled={!posts?.next} onClick={handleNext} className='disabled:cursor-not-allowed px-4 py-2 rounded shadow font-semibold cursor-pointer'>Next</button>
        </div>
    </div>
  )
}

export default PaginatedPosts