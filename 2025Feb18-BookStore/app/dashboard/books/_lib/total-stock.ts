import { FetchBooks } from "@/lib/data";
import { Book } from "@/types/book";

export async function TotalStock() {

  const books: Book[] = await FetchBooks()

  const totalStock = Array.from(books).reduce((acc, book) => {
    return acc + book.stock_quantity
  }, 0)

  return totalStock

}

