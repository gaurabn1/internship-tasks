import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { AddBooks, FetchBook, UpdateBook } from "@/lib/data"
import { Book, BookStatus } from "@/types/book"
import { useEffect, useState } from "react"
import { DEFAULT_BOOK } from "../_constants/bookConstants"
import { DialogFooter } from "@/components/ui/dialog"
import { FormProps } from "../_types/FormProps"
import { TotalItemsSold } from "../_lib/total-items-sold"
import { TotalSales } from "../_lib/total-sales"

const Form: React.FC<FormProps> = ({ id }) => {

  const [book, setBook] = useState<Book>({ ...DEFAULT_BOOK } as Book)
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      const fetchedBook = await FetchBook(id)
      setBook({
        ...book,
        id: fetchedBook.id,
        title: fetchedBook.title,
        author: fetchedBook.author,
        isbn: fetchedBook.isbn,
        genre: fetchedBook.genre,
        price: fetchedBook.price,
        stock_quantity: fetchedBook.stock_quantity,
        status: fetchedBook.status,
        published_date: fetchedBook.published_date,
        total_items_sold: fetchedBook.total_items_sold,
        total_sales: fetchedBook.total_sales
      })
    }
    if (id)
      fetchData()
  }, [id])


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const total_items_sold = TotalItemsSold(40)
    let price = Number(book.price);
    if (e.target.name === "price")
      price = Number(e.target.value)
    if (e.target.name === "price" || e.target.name === "stock_quantity") {
      setBook({
        ...book,
        [e.target.name]: Number(e.target.value),
        total_items_sold: Number(total_items_sold.toFixed(2)),
        total_sales: Number((price * total_items_sold).toFixed(2))
      })
      return;
    }
    setBook({
      ...book,
      [e.target.name]: e.target.value,
      total_items_sold: Number(total_items_sold.toFixed(2)),
      total_sales: Number((price * total_items_sold).toFixed(2))
    })
  }

  function handleUpdateBook() {
    UpdateBook(id, book)
    setBook(DEFAULT_BOOK);
    TotalSales(true)
    toast({
      title: 'Success',
      description: 'Book updated successfully',
    })
  }

  function handleAddBook() {
    // Add the Book to the database
    AddBooks(book)
    // Reset the table data
    setBook(DEFAULT_BOOK);
    // Get the total sales and Update the card data
    TotalSales(true)
    // Show a success message
    toast({
      title: 'Success',
      description: 'Book added successfully',
    })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !book.title.trim() ||
      !book.author.trim() ||
      !book.isbn.trim() ||
      !book.genre.trim() ||
      Number(book.price) < 0 ||
      Number(book.stock_quantity) < 0 ||
      !book.status.trim() ||
      !book.published_date
    ) {
      toast({
        title: 'Error',
        description: 'Please fill all the fields',
      })
      return;
    } else {
      if (id) {
        handleUpdateBook()
      } else {
        handleAddBook()
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">
          Title
        </Label>
        <Input
          id="title"
          name="title"
          value={book.title}
          onChange={handleChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="author" className="text-right">
          Author
        </Label>
        <Input
          id="author"
          name="author"
          value={book.author}
          onChange={handleChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="isbn" className="text-right">
          ISBN
        </Label>
        <Input
          id="isbn"
          name="isbn"
          value={book.isbn}
          onChange={handleChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="genre" className="text-right">
          Genre
        </Label>
        <Input
          id="genre"
          name="genre"
          value={book.genre}
          onChange={handleChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="price" className="text-right">
          Price
        </Label>
        <Input
          id="price"
          name="price"
          type="number"
          value={book.price}
          onChange={handleChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="stock_quantity" className="text-right">
          Stock Quantity
        </Label>
        <Input
          id="stock_quantity"
          name="stock_quantity"
          type="number"
          value={book.stock_quantity}
          onChange={handleChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="status" className="text-right">
          Status
        </Label>
        <Select onValueChange={(value) => setBook({ ...book, status: value as BookStatus })}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Out of Stock">Out of Stock</SelectItem>
              <SelectItem value="Discontinued">Discontinued</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="published_date" className="text-right">
          Published Date
        </Label>
        <Input
          id="published_date"
          name="published_date"
          value={book.published_date}
          onChange={handleChange}
          className="col-span-3"
        />
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </form>
  );
};

export default Form;
