'use client'
import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DeleteBook, FetchBooks } from "@/lib/data"
import { Book } from "@/types/book"
import { Input } from "@/components/ui/input"
import { formatNumber } from "@/lib/utils"
import { AddBook } from "./_components/add-book"
import { Button } from "@/components/ui/button"
import { UpdateExistingBook } from "./_components/update-book"
import { TotalSales } from "./_lib/total-sales"

function Page() {

  const [books, setBooks] = useState<Book[]>([])
  const [data, setData] = useState("")
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books)
  const [isRefresh, setIsRefresh] = useState(false)
  const [totalSales, setTotalSales] = useState(0)

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await FetchBooks();
      setBooks(data);
      setFilteredBooks(data);
      // Calculate total sales after fetching books
      const sales = data.reduce((acc, book) => acc + book.total_sales, 0);
      setTotalSales(sales);
    };
    fetchBooks();
  }, [isRefresh]);

  useEffect(() => {
    handleSearch();
  }, [data])

  function handleSearch() {
    if (books.length > 0) {
      const filtered = books.filter((book: Book) => book.title.toLowerCase().includes(data.toLowerCase()));
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books);
    }
  }

  if (filteredBooks === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">No books found</h1>
      </div>
    )
  }

  function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this book?")) return
    DeleteBook(id)
    TotalSales()
    setIsRefresh(!isRefresh)
  }


  return (
    <>
      <div className="mx-5">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Books</h1>
          <div className="flex mx-5 w-3/12 gap-3">
            <Button variant="default" onClick={() => setIsRefresh(!isRefresh)}>Refresh Data</Button>
            <AddBook />
            <Input placeholder="Search Books" onChange={(e) => setData(e.target.value)} className="w-full" />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Isbn</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Total Sales</TableHead>
              <TableHead>Total Items Sold</TableHead>
              <TableHead>Published Date</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBooks.map((book) => (
              <TableRow key={book.id}>
                <TableCell className="font-medium">{book.isbn}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.status}</TableCell>
                <TableCell>{book.stock_quantity}</TableCell>
                <TableCell>${book.total_sales}</TableCell>
                <TableCell>{book.total_items_sold}</TableCell>
                <TableCell>{book.published_date}</TableCell>
                <TableCell className="text-right">${book.price}</TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <UpdateExistingBook id={book.id} />
                  <Button variant="destructive" onClick={() => handleDelete(book.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6}>Total</TableCell>
              <TableCell>
                ${
                  Number(totalSales.toFixed(2))
                }
              </TableCell>
              <TableCell colSpan={2}></TableCell>
              <TableCell className="text-right">
                ${formatNumber(filteredBooks.reduce((acc, book) => acc + book.price, 0))}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  )
};

export default Page;
