import BaseTable from "@/features/table";
import authors from "../action/author.action";
import Author from "../types/author";

const tableheaders = ["Id", "Name", "Birth Date", "Actions"]

export default async function AuthorTable() {
  const author_data = await authors();
  const rows = author_data.map((author: Author) => ({
    id: author.id,
    name: author.name,
    birth_date: author.birth_date,
    actions: (
      <div className="flex gap-2">
        <a href="#" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border">Edit</a>
        <a href="#" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded border">Delete</a>
      </div>
    )
  }))
  return (
    <BaseTable
      caption={"a list of authors."}
      tableheaders={tableheaders}
      rows={rows}
    />
  )
}
