import { FetchBooks } from "@/lib/data";
import { Book } from "@/types/book";
import UpdateCardData from "./update-card-data";

export async function TotalSales(isUpdate?: boolean) {

  const books: Book[] = await FetchBooks()

  const totalSales = Array.from(books).reduce((acc, book) => {
    return acc + book.total_sales
  }, 0)

  if (isUpdate)
    UpdateCardData(Number(totalSales.toFixed(2)))
  return totalSales

}

