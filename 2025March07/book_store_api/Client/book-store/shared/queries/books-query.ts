'use client'
import { useQuery } from "@tanstack/react-query";
import { books } from "../api/book";

export default function BookQuery() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["books"],
    queryFn: books
  });
  return { data, isLoading, isError };
};
