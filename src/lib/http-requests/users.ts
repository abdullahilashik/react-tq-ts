// get all Users
export async function getUsers() {
  const request = await fetch("http://localhost:3000/users", {
    method: "GET",
  });
  if (!request.ok) {
    throw new Error("Failed to get data");
  }
  const response = await request.json();
  return response;
}

// get single user

export async function getUserById(id: number) {
  const request = await fetch("http://localhost:3000/useers?id=" + id, {
    method: "GET",
  });
  if (!request.ok) {
    throw new Error("Failed to get data");
  }
  const response = await request.json();
  return response;
}

// get users paginated

export async function getUsersPaginated(page: number, per_page: number = 10) {
  const request = await fetch(
    `http://localhost:3000/users?page=${page}&per_page=${per_page}`,
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
