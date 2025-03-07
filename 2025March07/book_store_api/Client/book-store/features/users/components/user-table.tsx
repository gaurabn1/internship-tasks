import BaseTable from "@/features/table";
import users from "../action/user.action";
import User from "../types/user";

const tableheaders = ["Id", "Name", "Actions"]

export default async function CategoryTable() {
  const users_data = await users();

  const rows = users_data.map((user: User) => ({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    actions: (
      <div className="flex gap-2">
        <a href="#" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border">Edit</a>
        <a href="#" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded border">Delete</a>
      </div>
    )
  }))
  return (
    <BaseTable
      caption={"a list of users."}
      tableheaders={tableheaders}
      rows={rows}
    />
  )
}
