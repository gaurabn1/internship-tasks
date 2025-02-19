export type BookStatus = "Available" | "Out of Stock" | "Discontinued";

export interface Book {
  title: string;
  author: string;
  isbn: string;
  genre: string;
  price: number;
  stock_quantity: number;
  published_date: string;
  status: BookStatus;
  total_items_sold: number;
  total_sales: number;
}

export interface CardDashboardProps {
  title: string,
  description: string,
  content: string
}
