import { fetcher } from "@/lib/data";

export default function UpdateCardData(totalSales: number, totalStock: number) {
  fetcher('/card-data/1', 'PUT', { 'title': totalSales, 'description': 'Total Sales', 'content': '+19% from last month' }, { 'Content-Type': 'application/json' }).then((res) => {
    return res
  })

  fetcher('/card-data/2', 'PUT', { 'title': totalStock, 'description': 'Total Stock', 'content': '+19% from last month' }, { 'Content-Type': 'application/json' }).then((res) => {
    return res
  })
};

