import books from "../action/books.action"
import Book from "../types/book";
import BaseTable from "@/features/table";

const tableheaders = ["Isbn", "Title", "Author", "Category", "Published", "Price", "Actions"]

export default async function BookTable() {
  const book_data = await books();
  const rows = book_data.map((book: Book) => ({
    isbn: book.isbn,
    title: book.title,
    author: book.author,
    category: book.category,
    published_date: book.published_date,
    price: book.price,
    actions: (
      <div className="flex gap-2">
        <a href="#" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border">Edit</a>
        <a href="#" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded border">Delete</a>
      </div>
    )
  }))
  return (
    <BaseTable
      caption={"a list of books."}
      tableheaders={tableheaders}
      rows={rows}
    />
  )
}
