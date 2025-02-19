import { fetcher } from "@/lib/data";

export default function UpdateCardData(totalSales: number) {
  fetcher('/card-data/1', 'PUT', { 'title': totalSales, 'description': 'Total Sales', 'content': '+19% from last month' }, { 'Content-Type': 'application/json' }).then((res) => {
    console.log(res)
    return res
  })
};

