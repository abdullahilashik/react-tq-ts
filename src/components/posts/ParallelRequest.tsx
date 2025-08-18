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

  return (
    <>
        {isLoading && <p>Users loading....</p>}
        {isSuccess && <p>{users.length} Users loaded.</p>}
        {isLoadingPosts && <p>Parallel query loading...</p>}
        <pre>
            {!isLoadingPosts && <p>{posts.reduce((acum,i) => i.data.length + acum, 0)} Posts found</p>}
        </pre>
    </>
  )
}

export default ParallelRequest