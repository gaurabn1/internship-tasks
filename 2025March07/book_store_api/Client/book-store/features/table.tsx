import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Cart from "./carts/types/cart"


export default async function BaseTable({ caption, tableheaders, rows }: { caption: string, tableheaders: string[], rows: Cart[] }) {
  return (
    <Table>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          {
            tableheaders.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))
          }
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          rows?.map((row, index) => (
            <TableRow key={index}>
              {
                Object.values(row).map((value, index) => (
                  <TableCell key={index}>{value ? value : "NULL"}</TableCell>
                ))
              }
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  )
}
