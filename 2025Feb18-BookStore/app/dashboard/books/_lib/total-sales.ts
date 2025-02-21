import { FetchBooks } from "@/lib/data";
import { Book } from "@/types/book";
import UpdateCardData from "./update-card-data";
import { TotalStock } from "./total-stock";

export async function TotalSales(isUpdate?: boolean) {

  const books: Book[] = await FetchBooks()

  const totalSales = Array.from(books).reduce((acc, book) => {
    return acc + book.total_sales
  }, 0)

  const totalStock = await TotalStock()

  if (isUpdate)
    UpdateCardData(Number(totalSales.toFixed(2)), Number(totalStock.toFixed(2)))
  return totalSales

}

