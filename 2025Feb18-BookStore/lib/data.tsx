import { Book } from "@/types/book"

const BASE_URL = "http://localhost:5000"


export async function fetcher(path: string, method: string, body: object | null, headers: Record<string, string> | null) {
  return await fetch(`${BASE_URL}${path}`, {
    method: method,
    headers: headers || { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : null,
  }).then((res) => {
    console.log(res.ok)
    console.log(res)
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  })
}

export async function FetchBook(id: string) {
  try {
    const res = await fetcher(`/books/${id}`, 'GET', null, { 'Content-Type': 'application/json' })
    return res
  } catch (e) {
    console.error("Error fetching data", e)
    return null
  }
}

export async function FetchBooks() {
  try {
    const res = await fetcher('/books', 'GET', null, { 'Content-Type': 'application/json' })
    return res
  } catch (e) {
    console.error("Error fetching data", e)
    return null
  }
};

export async function AddBooks(data: Book) {
  try {
    const res = await fetcher('/books', 'POST', data, { 'Content-Type': 'application/json' })
    return res
  } catch (e) {
    console.error("Error fetching data", e)
    return null
  }
}

export async function UpdateBook(id: string, data: Book) {
  try {
    const res = await fetcher(`/books/${id}`, 'PUT', data, { 'Content-Type': 'application/json' })
    return res
  } catch (e) {
    console.error("Error fetching data", e)
    return null
  }
}

export async function DeleteBook(id: string) {
  try {
    return await fetcher(`/books/${id}`, 'DELETE', null, { 'Content-Type': 'application/json' })
  } catch (e) {
    console.error("Error fetching data", e)
    return null
  }
}
