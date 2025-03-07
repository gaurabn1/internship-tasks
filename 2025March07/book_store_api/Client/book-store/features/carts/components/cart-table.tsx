import Cart from "../types/cart";
import carts from "../action/cart.action";
import BaseTable from "@/features/table";

const tableheaders = ["Id", "Customer", "Books", "Actions"]

export default async function CartTable() {
  const cart_data = await carts();

  const rows = cart_data.map((cart: Cart) => ({
    id: cart.id,
    customer: cart.customer,
    books: cart.books.map((book: string) => book).join(", "),
    actions: (
      <div className="flex gap-2">
        <a href="#" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border">Edit</a>
        <a href="#" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded border">Delete</a>
      </div>
    )
  }))
  return (
    <BaseTable
      caption={"a list of carts."}
      tableheaders={tableheaders}
      rows={rows}
    />
  )
}
