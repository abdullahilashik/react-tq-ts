import { useQueries, useQuery } from '@tanstack/react-query'
import React from 'react'
import { getUsers } from '../../lib/http-requests/users'
import { getPostsByUserId } from '../../lib/http-requests/posts';

const ParallelRequest = () => {

    const {data: users, isLoading, isSuccess} = useQuery({
        queryKey: ['users'],
        queryFn: getUsers
    });

    // parallel queries

    const posts = useQueries({
        queries: users?.map(user => {
            return {
                queryKey: ['posts', user.id],
                queryFn: () => getPostsByUserId(user.id),
                enabled: !!users.length
            };
        }) ?? []
    })

    const isLoadingPosts = posts.some(i => i.isLoading || i.isFetching);    

    if(isLoadingPosts){
        return (
            <div className='text-3xl font-semi uppercase'>Loading please wait...</div>
        );
    }

  return (
    <>
        <div className="flex flex-col gap-4">
            {
                posts?.map((post, index)=> (
                    <div key={index} className="grid grid-cols-4 gap-2">
                        {
                            post?.data?.map(item=>(
                                <div className="p-4">
                                    <h4 className='font-semibold'>{item.title}</h4>
                                    <p className='text-xs'>{item.body}</p>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    </>
  )
}

export default ParallelRequest