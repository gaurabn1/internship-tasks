"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { FetchBooks } from "@/lib/data"
import { useEffect, useState } from "react"
import { Book } from "@/types/book"


export default function BarComponent() {
  const [books, setBooks] = useState<Book>([]);

  useEffect(() => {
    const getBooks = async () => {
      const fetchedBooks = await FetchBooks();
      setBooks(fetchedBooks);
    };

    getBooks();
  }, []);

  if (books.length === 0) return <div>Loading...</div>;

  const statusData = books.reduce((acc: Record<string, { stockQuantity: number, totalPrice: number, count: number }>, book) => {
    if (!acc[book.status]) {
      acc[book.status] = { stockQuantity: 0, totalPrice: 0, count: 0 };
    }

    acc[book.status].stockQuantity += book.stock_quantity;
    acc[book.status].totalPrice += book.price;
    acc[book.status].count += book.stock_quantity > 0 ? 1 : 0;
    return acc;
  }, {} as Record<string, { stockQuantity: number; totalPrice: number; count: number }>);

  const chartData = Object.entries(statusData).map(([status, data]) => {
    if (data) {
      return {
        status,
        stockQuantity: statusData[status].stockQuantity || 0.9,
        averagePrice: statusData[status].count ? (statusData[status].totalPrice / statusData[status].count).toFixed(2) : 0,
      }
    }

    return {
      status,
      stockQuantity: 0,
      averagePrice: 0
    }
  });

  const chartConfig = {
    stockQuantity: {
      label: "Stock Quantity",
      color: "hsl(var(--chart-1))",
    },
    averagePrice: {
      label: "Average Price",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[360px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="status"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="stockQuantity" fill="var(--color-stockQuantity)" radius={4} />
            <Bar dataKey="averagePrice" fill="var(--color-averagePrice)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
