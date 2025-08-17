// get all posts
export async function getPosts() {
  const request = await fetch("http://localhost:3000/posts", {
    method: "GET",
  });
  if (!request.ok) {
    throw new Error("Failed to get data");
  }
  const response = await request.json();
  return response;
}

// get single post

export async function getPostById(id: number) {
  const request = await fetch("http://localhost:3000/posts?postId=" + id, {
    method: "GET",
  });
  if (!request.ok) {
    throw new Error("Failed to get data");
  }
  const response = await request.json();
  return response;
}

// get posts paginated

export async function getPostsPaginated(page: number, per_page: number = 10) {
  const request = await fetch(
    `http://localhost:3000/posts?page=${page}&per_page=${per_page}`,
    {
      // _page=1&_per_page=25
      method: "GET",
    }
  );
  if (!request.ok) {
    throw new Error("Failed to get data");
  }
  const response = await request.json();
  return response;
}


// create new post
// update post
// delete post