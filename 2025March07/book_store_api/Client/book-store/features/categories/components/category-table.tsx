import categories from "../action/category.action";
import BaseTable from "@/features/table";
import Category from "../types/category";

const tableheaders = ["Id", "Name", "Actions"]

export default async function CategoryTable() {
  const cat_data = await categories();

  const rows = cat_data.map((cat: Category) => ({
    id: cat.id,
    name: cat.name,
    actions: (
      <div className="flex gap-2">
        <a href="#" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border">Edit</a>
        <a href="#" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded border">Delete</a>
      </div>
    )
  }))
  return (
    <BaseTable
      caption={"a list of categories."}
      tableheaders={tableheaders}
      rows={rows}
    />
  )
}
