
"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

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

const books = await FetchBooks();


const stockCounts = books.reduce((acc, book) => {
  acc[book.status] = (acc[book.status] || 0) + 1;
  return acc;
}, {});


const chartData = [
  { status: "Available", count: stockCounts.Available, fill: "var(--color-available)" },
  { status: "Out of Stock", count: stockCounts["Out of Stock"], fill: "var(--color-outofstock)" },
  { status: "Discontinued", count: stockCounts.Discontinued, fill: "var(--color-discontinued)" },
]


const chartConfig = {
  count: {
    label: "Books",
  },
  available: {
    label: "Available",
    color: "hsl(var(--chart-1))",
  },
  outofstock: {
    label: "Out of Stock",
    color: "hsl(var(--chart-2))",
  },
  discontinued: {
    label: "Discountinued",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export default function PieChartComponent() {

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[405px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {chartConfig.count.label}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Stocks
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total books on stock for each status: Available, Out of Stock, and Discontinued
        </div>
      </CardFooter>
    </Card>
  )
}
import { FetchBooks } from "@/lib/data"
import { Book } from "@/types/book"

