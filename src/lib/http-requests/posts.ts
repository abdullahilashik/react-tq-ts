import { delay } from "../delay";

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
export async function getPostsByUserId(id: number) {
  await delay(5);
  const request = await fetch("http://localhost:3000/posts?userId=" + id, {
    method: "GET",
  });
  if (!request.ok) {
    throw new Error("Failed to get data");
  }
  const response = await request.json();
  return response;
}

/**
 * Get paginated data
 * Response 
 {
  "first": 1,
  "prev": 3,
  "next": 5,
  "last": 50,
  "pages": 50,
  "items": 100,
  "data": [
    {
      "userId": 1,
      "id": "7",
      "title": "magnam facilis autem",
      "body": "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas"
    },
    {
      "userId": 1,
      "id": "8",
      "title": "dolorem dolore est ipsam",
      "body": "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae"
    }
  ]
}
 * @param page 
 * @param per_page 
 * @returns 
 */

export async function getPostsPaginated(page: number = 1, per_page: number = 10) {
  await delay(5);
  const request = await fetch(
    `http://localhost:3000/posts?_page=${page}&_per_page=${per_page}`,
    {      
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
export async function createPost(payload) {
  const request = await fetch("http://localhost:3000/posts", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      'Content-type': 'application/json',
      'accept': 'application/json'
    }
  });
  if (!request.ok) {
    throw new Error("Failed to get data");
  }
  const response = await request.json();
  return response;
}
// update post

export async function updatePostById(payload, id) {
  const request = await fetch("http://localhost:3000/posts?id=" + id, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: {
      'Content-type': 'application/json',
      'accept': 'application/json'
    }
  });
  if (!request.ok) {
    throw new Error("Failed to get data");
  }
  const response = await request.json();
  return response;
}

// delete post
export async function deletePostById(id: number) {
  const request = await fetch("http://localhost:3000/posts?postId=" + id, {
    method: "DELETE",
  });
  if (!request.ok) {
    throw new Error("Failed to delete data");
  }
  const response = await request.json();
  return response;
}